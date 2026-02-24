import { useMemo, useState } from "react";
import { Mock_Brands, Mock_Jobs } from "../data/mock";
import type { Brand } from "../types/brand";

export const  useBrands = () => {

  const isAdmin = true; //Admin kontrolü

  const [searchTerm, setSearchTerm] = useState(""); //Arama kısmı için State

  //Arama varsa aramaya göre marka ismi filtrelenip daha sonra admin olup olmamasına göre finans bilgilerini hiç yollamıyor
  const filteredBrands = useMemo (() => {

    let filtered = Mock_Brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())); //Arama yapılırsa aramaya göre filtreleme

    filtered = filtered.sort((a, b) => b.totalActiveJobs - a.totalActiveJobs); //Kart sırası için Aktif işe göre sıralama

    return filtered.map((brand: Brand) => { //Admin değil ise finans bilgilerini yollamıyoruz
      if (isAdmin) {
        return brand;
      } else {
        return {
          ...brand,
          currentDebt: 0,
          monthlyRetainerAmount: undefined,
          paymentDay: undefined,
        }
      };
    })
  }, [isAdmin, searchTerm])

  const processedBrands = useMemo (() => {
    return filteredBrands.map((brand) => {
      const brandJobs= Mock_Jobs.filter((job) => job.brandId === brand.id); 

      const activeJobs = brandJobs.filter(
        (job) => job.status === 'In_Progress' || job.status === 'Revision'
      );

      const departmenStats = activeJobs.reduce((acc, job) => {
        const dept = job.department;
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
        return {
          ...brand,
          activeJobsCount: activeJobs.length,
          departmenStats,
        };
    });
  }, [filteredBrands]);




    
  return {
    isAdmin,
    filteredBrands,
    searchTerm,
    setSearchTerm,
    processedBrands,
  };
};

export default useBrands
