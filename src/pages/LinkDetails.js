import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import LinkInfo from "../components/LinkInfo";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
export default function LinkDetails() {
  const [link, setLink] = useState(null);
  const urlParams = useParams();
  const http = useHttp();
  const { id } = urlParams;

  const getLinkDetails = useCallback(async () => {
    try {
      const response = await http.request(`/link/${id}`);
      setLink(response.data);
    } catch (error) {}
  }, [http.request, id]);

  useEffect(() => {
    getLinkDetails();
  }, []);

  return (
    <>
      <Navbar />
      <LinkInfo link={link} />
    </>
  );
}
