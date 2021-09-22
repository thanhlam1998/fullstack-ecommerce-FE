import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () => {
    return subs.map((s) => (
      <Link
        className=" col text-nowrap btn btn-dark btn-lg btn-block btn-raise m-3 fw-bold"
        key={s._id}
        to={`/sub/${s.slug}`}>
        {s.name}
      </Link>
    ));
  };

  return (
    <div className="container">
      <div className="row">{loading ? <h4>Loading...</h4> : showSubs()}</div>
    </div>
  );
};

export default SubList;
