import { useState, useEffect } from "react";
import { Button } from "antd";
import FooterNav from "../components/FooterNav";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useUser } from "../contexts/UserContext";
import { core_services } from "../utils/api";
import logo from "../assets/logo/logo.png"

const Profile = () => {
  const { user } = useUser()
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [historyTab, setHistoryTab] = useState(1);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isDepositLoading, setIsDepositLoading] = useState(true);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(true);
  const [isEarnModalOpen, setIsEarnModalOpen] = useState(false);


  useEffect(() => {
    if (user) setIsUserLoading(false);
  }, [user]);


  const [depositHistory, setDepositHistory] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const fetchDeposits = async () => {
    try {
      const res = await core_services.getDepositList();
      const formatted = res.map((entry: any) => ({
        amount: entry.amount,
        date: new Date(entry.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));
      setDepositHistory(formatted);
    } catch (err) {
      console.error("Failed to fetch deposit history", err);
    } finally {
      setIsDepositLoading(false);
    }
  };
  const fetchWithdrawals = async () => {
    try {
      const res = await core_services.getWithdrawList();
      const formatted = res.map((entry: any) => ({
        amount: entry.amount,
        date: new Date(entry.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));
      setWithdrawHistory(formatted);
    } catch (err) {
      console.error("Failed to fetch withdraw history", err);
    } finally {
      setIsWithdrawLoading(false);
    }
  };

  useEffect(() => {

    fetchDeposits();
    fetchWithdrawals();
  }, []);

  return (
    <>
      
      <FooterNav />
    </>)
};

export default Profile;
