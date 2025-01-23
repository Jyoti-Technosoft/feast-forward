import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";
import { IoIosSearch } from "react-icons/io";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { getJoinNowUsers } from "../Services/CommonServices";
import Loading from "../assets/images/loading_gif.webp"
import "../assets/styles/JoinNowUser.css";

const JoinNowUsers = () => {
  const containerRef = useRef(null);
  const [joinNowUsersData, setJoinNowUsersData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);

  const getJoinNowUsersData = async () => {
    try {
      const response = await getJoinNowUsers();
      if (response?.status === 200) {
        setJoinNowUsersData(response?.data?.users || []);
      } else {
        setJoinNowUsersData([]);
      }
    } catch (error) {
      console.log("error:", error);
      setJoinNowUsersData([]);
    }
  };

  const colors = [
    { color: '#1f93b4', backgroundColor: '#e6f0f4' },
    { color: '#c69f60', backgroundColor: '#fefce8' },
    { color: '#609e78', backgroundColor: '#dcfce7' }
  ];

  const FullNameInitials = ({ fullName }) => {
    if (!fullName) return null;
    const initials = fullName.split(' ').slice(0, 2).map(word => word[0]?.toUpperCase()).join('');
    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors?.length);
      return colors[randomIndex];
    };
    const { color: textColor, backgroundColor } = getRandomColor();
    const style = {
      display: 'inline-block',
      width: '35px',
      height: '35px',
      lineHeight: '35px',
      borderRadius: '50%',
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      color: textColor,
      backgroundColor: backgroundColor,
      border: `1px solid ${textColor}`,
      margin: "0px 8px 0px 0px"
    };
    return <span style={style}>{initials}</span>;
  };

  const loadMoreData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const nextData = joinNowUsersData.slice(displayedData.length, displayedData.length + 5);
      setDisplayedData((prevData) => [...prevData, ...nextData]);
      setIsLoading(false);
    }, 2000);
  };

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const bottom = container.scrollHeight === container.scrollTop + container.clientHeight;
    if (bottom && !isLoading && displayedData.length < joinNowUsersData.length) {
      loadMoreData();
    }
    // eslint-disable-next-line
  }, [displayedData, isLoading]);

  const columns = useMemo(() => [
    {
      Header: "Full Name",
      accessor: "fullName",
      Cell: ({ row }) => (
        <>
          <FullNameInitials fullName={row?.original?.fullName} />
          {row?.original?.fullName}
        </>
      ),
    },
    { Header: "Email", accessor: "email" },
    { Header: "Contact No", accessor: "contactNo" },
    {
      Header: "Reason",
      accessor: "reason",
      Cell: ({ row }) => {
        const reason = row?.original?.reason;
        const truncatedReason = reason?.length > 20 ? reason.substring(0, 20) + "..." : reason;
        return (
          <>
            <span data-tip={reason} data-for="reason-tooltip">
              {truncatedReason}
            </span>
            <Tooltip id="reason-tooltip" place="bottom" effect="solid" />
          </>
        );
      },
    },
  ], []);

  const data = useMemo(() => displayedData, [displayedData]);

  const {
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useFilters,
    useSortBy
  );

  useEffect(() => {
    getJoinNowUsersData();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (joinNowUsersData.length > 0) {
      setDisplayedData(joinNowUsersData.slice(0, 5));
    }
  }, [joinNowUsersData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 576);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="main-container-joinuser">
      <p className="header-user">Join Now Users</p>
      <div className="table-container">
        <div className='table-wrapper'>
          <div style={{ justifyContent: isMobileView ? "flex-start" : "flex-end" }} className="search-container">
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="search-input"
            />
            <IoIosSearch style={{ left: isMobileView ? "165px" : "" }} className="search-icon" />
          </div>
          <div className="table-header">
            <div className="table-row">
              {headerGroups.map((headerGroup) => (
                <div className="table-row" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <div
                      className="table-cell"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <div>
                        <span className="sorting-icon" style={{ marginLeft: "7px" }}>
                          {
                            // column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaChevronDown />
                            ) : (
                              <FaChevronUp />
                            )
                            // ) : (
                            //   ""
                            // )
                          }
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="table-body" ref={containerRef}>
            {rows.length > 0 ? (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <div className="table-row" {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <div className="table-cell" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              <div className="table-row">
                <div className="table-cell" colSpan="4">
                  No users found
                </div>
              </div>
            )}
          </div>
        </div>
        {isLoading && (
          <div style={{ marginBottom: "0px" }} className="loading-container">
            {/* <div class="spinner"></div> */}
            <img style={{ width: "33px", height: "33px" }} src={Loading} alt="Loading..." className="loading-spinner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinNowUsers;
