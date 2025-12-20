export interface ColumnProps {
    key: string;
    label: string;
  }
  export const columns: ColumnProps[] = [
    {
      key: "sr",
      label: "sr.",
    },
   
    {
      key: "brandname",
      label: "brand name" ,
    },
    {
      key: "sale",
      label: "sale",
    },
    {
      key: "ach",
      label: "ach %",
    },
    {
      key: "growth",
      label: "growth",
    },
  ];
  export interface UserProps {
    sr: number;
    
    brandname?: string;
    sale?: string;
    ach?: number;
    growth?: number;
    nested?: {
      id: string;
      project_name?: string;
      topic?: string;
      days?: string
    }[]
  }
  export const users: UserProps[] = [
    {
      sr: 1,
      
      brandname: "Mark Dsuza",
      sale: "123",
      ach: 100,
      growth: 25,
      
    },
    {
      sr: 2,
      
      brandname: "Mark Dsuza",
      sale: "7843",
      ach: 55,
      growth: 19,
      
    },
    {
      sr: 3,
      
      brandname: "Mark Dsuza",
      sale: "344",
      ach: 90,
      growth : 32,
      
    },
    {
      sr: 4,
      
      brandname: "Mark Dsuza",
      sale: "457",
      ach: 90,
      growth: 24,
      
    },
    {
      sr: 5,
     
      brandname: "Mark Dsuza",
      sale: "578",
      ach: 90,
      growth : 45,
      
    },
    
  ];

  // donut chart data-------------------------------------------
  
  export const Bardata = [
    {
      name: 'A/T',
      uv: 3000,
      pv: 1200,
      amt: 1000,
    },
    {
      name: 'A/T',
      uv: 4000,
      pv: 1300,
      amt: 10,
    },
    {
      name: 'T/A',
      uv: 5000,
      pv: 1900,
      amt: 10,
    },
    {
      name: 'T/A',
      uv: 2000,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'T/A',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
   
  ];

  // pie chart data-------------------------------------------




   
  