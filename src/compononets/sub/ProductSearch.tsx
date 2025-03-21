interface ProductSearchProps {
  onSearch: any;
}

function ProductSearch(props: ProductSearchProps) {
  return (
      <div className="flex px-2 flex-row relative w-full">
          <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-green-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
          </div>
          <input
              type="text"
              onChange={(event) => props.onSearch(event.target.value)}
              className="bg-white rounded-3xl shadow text-lg w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none border border-green-300 focus:border-green-500"
              placeholder="Search ..."
          />
      </div>
  );
};

export default ProductSearch;
