import { useState, useMemo } from "react";
import { Mock_Jobs } from "../data/mock";
import { type Department} from "../types/enum";
import { type Job } from "../types/job";
import { useSearchParams } from "react-router-dom";

export const useJobs = () => {

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Department | "Tümü">("Tümü"); // Filtreleme için Aktif Departman
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || ""); //Arama kısmı için State

  // Aramaya ve Departmana Göre Filtreleme
  const filteredJobs = useMemo(() => {

    let jobs = Mock_Jobs;

    if (activeTab !== "Tümü") {
      jobs = jobs.filter((job) => job.department === activeTab);
    } //Departman Filtreleme

    //  Arama Filtresi 
    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();

      jobs = jobs.filter((job) => {
        const brandMatch = job.brand?.name.toLowerCase().includes(lowerTerm);
        const titleMatch = job.title.toLowerCase().includes(lowerTerm);
        const userMatch = job.assignedTo.some(user =>
          user.fullname.toLowerCase().includes(lowerTerm)
        );
        return brandMatch || titleMatch || userMatch;
      });
    }

    return jobs;

  }, [activeTab, searchTerm]);

  // filtrelenmiş veriyi Status durumuna göre filtreliyoruz
  const categorizedJobs = useMemo(() => {
    return {
      pending: filteredJobs.filter((job: Job) => job.status === "In_Progress"),
      revision: filteredJobs.filter((job: Job) => job.status === "Revision"),
      completed: filteredJobs.filter((job: Job) => job.status === "Done"),
    };
  }, [filteredJobs]);

  // Toplam iş Filtreleri
  const stats = {
    totalCount: filteredJobs.length,
    pendingCount: categorizedJobs.pending.length,
    revisionCount: categorizedJobs.revision.length,
    completedCount: categorizedJobs.completed.length,
  };


  return {
    activeTab,
    setActiveTab,
    ...categorizedJobs,
    stats,
    searchTerm,
    setSearchTerm,
  };
};