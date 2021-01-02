const GridNav = () => {
  return (
    <div className='gridnav header__gridnav'>
      <button
        className='gridnav__btn gridnav__btn_prev icon icon-left-open-big'
        title='Предыдущий период'
      ></button>
      <button className='gridnav__btn gridnav__btn_today'>Сегодня</button>

      <button
        className='gridnav__btn gridnav__btn_next  icon icon-right-open-big'
        title='Следующий период'
      ></button>
    </div>
  );
};

export default GridNav;
