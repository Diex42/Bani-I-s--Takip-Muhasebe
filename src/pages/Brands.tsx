import BrandsCard from "../components/brands/BrandsCard";
import BrandsHeader from "../components/brands/BrandsHeader"
import useBrands from "../hooks/useBrands"


function Brands() {

  const {filteredBrands, isAdmin, searchTerm, setSearchTerm, processedBrands} = useBrands();
  return (
    <div className="flex flex-col items-center w-full relative min-h-screen bg-bg">
      <BrandsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isAdmin={isAdmin}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-6 px-6 py-10">
        {processedBrands.map((brand) => (
          <BrandsCard
            key={brand.id}
            brand={brand}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="flex flex-col items-center mt-20">
          <p className="text-zinc-400 italic">Aranan kriterlere uygun marka bulunamadı.</p>
        </div>
      )}
        
      
    </div>
  )
}

export default Brands
