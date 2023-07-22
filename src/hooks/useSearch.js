const useSearch = (allrestraunts, query, setAllRestraunts) => {
	const filtered = allrestraunts.filter((restraunt) => {
		return restraunt.data.name.toLowerCase().includes(query.toLowerCase());
	});

	setAllRestraunts(filtered);
};

export default useSearch;
