const dateUtils = {
  comparetwoDate: (from, to) => {
    const stringToDate = stringDate => {
      const [dd, mm, yyyy] = stringDate.split('-');
      return new Date(yyyy, mm - 1, dd);
    };
    return stringToDate(from) >= stringToDate(to);
  },
};

export default dateUtils;
