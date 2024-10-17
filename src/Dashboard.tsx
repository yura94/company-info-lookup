import React, { useState, useEffect } from "react";
import { Mosaic, MosaicNode, MosaicWindow } from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import axios from "axios";
import './dashboard.css'

let windowIdCounter = 3;

interface Company {
  id: string;
  ticker: string;
  name: string;
  legal_name: string;
  stock_exchange: string;
  short_description: string;
  long_description: string;
  company_url: string;
  business_address: string;
  business_phone_no: string;
  entity_legal_form: string;
  latest_filing_date: string;
  inc_country: string;
  employees: number;
  sector: string;
  industry_category: string;
  industry_group: string;
  first_stock_price_date: string;
  last_stock_price_date: string;
  legacy_sector: string;
  legacy_industry_category: string;
  legacy_industry_group: string;
}

type Layout = {
  direction: "row" | "column";
  first: string | Layout;
  second: string | Layout;
};

const initialLayout: Layout = {
  direction: "row",
  first: "AAPL",
  second: {
    direction: "column",
    first: "NVDA",
    second: "TSLA",
  },
};

const Dashboard = () => {
  const [layout, setLayout] = useState<Layout>(initialLayout);
  const [companiesData, setCompaniesData] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get<Company[]>(`${process.env.PUBLIC_URL}/companies-lookup.json`);
        setCompaniesData(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (newLayout: MosaicNode<string> | null) => {
    setLayout(newLayout as Layout);
  };


  return (
    <Mosaic
      renderTile={(id, path) =>{ 
        const company = companiesData.find((c) => c.ticker === id);
        return (
        <MosaicWindow
          title={'Company info'}
          path={path}
          createNode={() => String.fromCharCode(windowIdCounter + 97)}
          // TODO custom button logik and select

          // toolbarControls={
          // <>
          //   <select
          //       value={company?.ticker || ''}
          //       style={{ marginLeft: "10px" }}
          //     >
          //       {companiesData.map((companyName) => (
          //         <option key={companyName.id} value={companyName.ticker}>
          //           {companyName.ticker}
          //         </option>
          //       ))}
          //     </select>
          //     <button title="Replace Window" className="mosaic-default-control bp4-button bp4-minimal replace-button bp4-icon-exchange"/>
          //       <button>Split</button>
          //       <button >Expand</button>
          //       <button >Remove</button>
              
          //     </>
          // }
        >
          <div
            style={{
              padding: "20px",
              height: "100%",
              backgroundColor: "#f0f0f0",
            }}
          >
            {company ? (
               <>
               <p><span className="font-bold text-sm my-1">{`Ticker: `}</span><span className="font-normal">{company.ticker}</span></p>
               <p><span className="font-bold text-sm my-1">{`Name: `}</span><span className="font-normal">{company.name}</span></p>
               <p><span className="font-bold text-sm my-1">{`Legal Name: `}</span><span className="font-normal">{company.legal_name}</span></p>
               <p><span className="font-bold text-sm my-1">{`Stock Exchange: `}</span><span className="font-normal">{company.stock_exchange}</span></p>
               <p><span className="font-bold text-sm my-1">{`Short Description: `}</span><span className="font-normal">{company.short_description}</span></p>
               <p><span className="font-bold text-sm my-1">{`Long Description: `}</span><span className="font-normal">{company.long_description}</span></p>
               <p><span className="font-bold text-sm my-1">{`Website: `}</span><span className="font-normal">{company.company_url}</span></p>
               <p><span className="font-bold text-sm my-1">{`Business Address: `}</span><span className="font-normal">{company.business_address}</span></p>
               <p><span className="font-bold text-sm my-1">{`Business Phone: `}</span><span className="font-normal">{company.business_phone_no}</span></p>
               <p><span className="font-bold text-sm my-1">{`Entity Legal Form: `}</span><span className="font-normal">{company.entity_legal_form}</span></p>
               <p><span className="font-bold text-sm my-1">{`Latest Filing Date: `}</span><span className="font-normal">{company.latest_filing_date}</span></p>
               <p><span className="font-bold text-sm my-1">{`Incorporation Country: `}</span><span className="font-normal">{company.inc_country}</span></p>
               <p><span className="font-bold text-sm my-1">{`Employees: `}</span><span className="font-normal">{company.employees}</span></p>
               <p><span className="font-bold text-sm my-1">{`Sector: `}</span><span className="font-normal">{company.sector}</span></p>
               <p><span className="font-bold text-sm my-1">{`Industry Category: `}</span><span className="font-normal">{company.industry_category}</span></p>
               <p><span className="font-bold text-sm my-1">{`Industry Group: `}</span><span className="font-normal">{company.industry_group}</span></p>
               <p>{`First Stock Price Date: ${company.first_stock_price_date}`}</p>
               <p>{`Last Stock Price Date: ${company.last_stock_price_date}`}</p>
               <p><span className="font-bold text-sm my-1">{`Legacy Sector: `}</span><span className="font-normal">{company.legacy_sector}</span></p>
               <p><span className="font-bold text-sm my-1">{`Legacy Industry Category: `}</span><span className="font-normal">{company.legacy_industry_category}</span></p>
               <p><span className="font-bold text-sm my-1">{`Legacy Industry Group: `}</span><span className="font-normal">{company.legacy_industry_group}</span></p>
             </>
            ) : (
              <div>Content for Window {id}</div>
            )}
          </div>
        </MosaicWindow>
      )}}
      value={layout}
      onChange={handleChange}
    />
  );
};

export default Dashboard;
