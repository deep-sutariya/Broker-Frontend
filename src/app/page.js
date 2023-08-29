"use client"
import Card from "@/components/Card";
import LoadingSpinner from "@/components/LoadingSpinner";
import Months from "@/components/Months";
import SortButtonWraper from "@/components/SortButtonWraper";
import { logIn } from "@/redux/features/authSlice";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [viewOption, setviewOption] = useState("month");
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.authReducer);
  const dispach = useDispatch();

  let date = new Date();
  let month = date.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedMessage, setSelectedMessage] = useState("");

  const [sortOption, setSortOption] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [monthlyBrokrage, setMonthlyBrokrage] = useState(0);

  const sortedCards = useMemo(() => {
    let sortedCards;
    if (user && user.cards && user.cards.length > 0) {
      sortedCards = [...user.cards];
      sortedCards.sort((a, b) => {
        switch (sortOption) {
          case 'date':
            return sortOrder === 'asc' ? new Date(a.sellingDate) - new Date(b.sellingDate) : new Date(b.sellingDate) - new Date(a.sellingDate);
          case 'pendingAmount':
            return sortOrder === 'asc' ? a.pendingAmount - b.pendingAmount : b.pendingAmount - a.pendingAmount;
          case 'dueDay':
            return sortOrder === 'asc' ? a.dueDay - b.dueDay : b.dueDay - a.dueDay;
          case 'totalAmount':
            return sortOrder === 'asc' ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount;
          case 'fullpaid':
            return a.fullpaymentDone && a.brokerpaymentDone ? -1 : 1;
          case 'brokerage':
            return a.fullpaymentDone && !a.brokerpaymentDone ? -1 : 1;
          case 'notpaid':
            return a.fullpaymentDone ? 1 : -1;
          default:
            return 0;
        }
      });
    }
    return sortedCards;
  }, [user.cards, sortOption, sortOrder]);

  const areCardsAvailableForMonth = (cards, targetMonth) => {
    return cards.some(item => new Date(item.sellingDate).getMonth() === targetMonth);
  };

  useEffect(() => {
    if (user && user.cards && user.cards.length > 0 && areCardsAvailableForMonth(user.cards, selectedMonth) === false) {
      setSelectedMessage("No cards available.");
    } else {
      setSelectedMessage("");
    }
  }, [user.cards, selectedMonth]);

  const getUserInfo = async (token) => {
    setIsLoading(true);
    try {
      const data = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, { token });
      if (data?.data?.user) {
        dispach(logIn(data?.data?.user));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("LOGIN_TOKEN");
    if (token && token.length > 0) {
      getUserInfo(token);
    }
  }, []);

  useEffect(() => {
    let totalBrokrage = 0;
    user && user.cards && user.cards.length > 0 && user.cards.forEach(element => {
      if (viewOption === "all") totalBrokrage += Number(element.brokerageAmt);
      else if (new Date(element.sellingDate).getMonth() === selectedMonth) {
        totalBrokrage += Number(element.brokerageAmt);
      }
    });
    setMonthlyBrokrage(parseFloat(totalBrokrage.toFixed(2)));
  }, [user.cards, sortedCards, selectedMonth, viewOption])

  return (
    <main className="flex flex-col gap-y-6 md:gap-y-8 mt-7 md:mt-14">

      <div className="mx-auto">
        <h1 className='font-heading font-semibold underline text-base md:text-2xl text-blue'>Selling Information</h1>
      </div>

      <div className="flex items-center gap-x-2 md:gap-x-4 w-[90%] sm:w-[75%] md:w-[50%] mx-auto">
        <button className={`w-1/2 py-1 md:py-2 md:text-lg text-sm border border-brown flex justify-center rounded-lg cursor-pointer ${viewOption == "all" ? `bg-brown text-common` : ``} `} onClick={() => { setviewOption("all") }}>All Sellings</button>
        <button className={`w-1/2 py-1 md:py-2 md:text-lg text-sm border border-brown flex justify-center rounded-lg cursor-pointer ${viewOption == "month" ? `bg-brown text-common` : ``} `} onClick={() => { setviewOption("month") }}>Monthly Sellings</button>
      </div>

      {
        viewOption === "month" ?
          <div className="month-scroll text-center overflow-x-scroll w-[85%] mx-auto flex">
            <Months selected={selectedMonth} setSelected={setSelectedMonth} />
          </div>
          :
          <></>
      }

      <div className="flex justify-center">
        <SortButtonWraper sortOption={sortOption} setSortOption={setSortOption} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>


      <div className="w-[85%] mx-auto">
        {
          viewOption === "month" ?
            <p className="font-heading float-right text-xs sm:text-base">Monthly brokerage: <span className="font-extrabold sm:tracking-wider text-red-700">{monthlyBrokrage}</span> ₹</p>
            :
            <p className="font-heading float-right text-xs sm:text-base">Yearly brokerage: <span className="font-extrabold sm:tracking-wider text-red-700">{monthlyBrokrage}</span> ₹</p>
        }
      </div>

      <div className="grid gap-y-4 md:gap-y-8 w-[85%] mx-auto mb-10 sm:mb-20">
        {isLoading ? (
          <LoadingSpinner />
        )
          :
          (sortedCards && sortedCards.length > 0 && (
            sortedCards
              .filter(item => {
                const sellingDate = new Date(item.sellingDate);
                const cardMonth = sellingDate.getMonth();
                return viewOption === "all" || cardMonth === selectedMonth;
              })
              .map((item, ind) => (
                <Card key={ind} formData={item} />
              ))
          ))

        }
        {
          viewOption === 'month' && sortedCards && sortedCards.length > 0 && selectedMessage.length > 0 && <p className="text-center text-gray-600">{selectedMessage}</p>
        }
        {
          viewOption === 'all' && sortedCards && sortedCards.length === 0 && (
            <p className="text-center text-gray-600">No cards available for this option.</p>
          )}

      </div>

    </main>
  )
}