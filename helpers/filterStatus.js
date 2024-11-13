module.exports = (status) => {
  let filterStatus = [
    {
      title: 'Tất cả',
      class: '',
      buttonStatus: ""
    },
    {
      title: 'Đang hoạt động',
      class: '',
      buttonStatus: "true"
    },
    {
      title: 'Ngừng hoạt động',
      class: '',
      buttonStatus: "false"
    }
  ];
  if (status) {
    let seachFilter = filterStatus.find((item) => { return item.buttonStatus === status });
    seachFilter.class = 'active';
  }
  else {
    filterStatus[0].class = 'active';
    // let seachFilter = filterStatus.find((item) => { return item.buttonStatus === status });
    // seachFilter.class = 'active';
  }
  return filterStatus;
}