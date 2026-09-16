import { useState, useEffect, useCallback } from "react";
import contactService from "../services/contactService";

export const useMessages = (params = {}) => {
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = useCallback(async (queryParams = params) => {
    setLoading(true);
    try {
      const response = await contactService.getAll(queryParams);
      setMessages(Array.isArray(response?.data) ? response.data : []);
      setPagination(response?.pagination || null);
    } catch (err) {
      console.error(err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await contactService.getUnreadCount();
      setUnreadCount(response?.data?.count || 0);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();
  }, [fetchMessages, fetchUnreadCount]);

  return { messages, pagination, loading, unreadCount, refetch: fetchMessages, refetchUnread: fetchUnreadCount };
};