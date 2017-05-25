const GLOBLE = {
  STORE_KEY: 'a56z0fzrNpl^2',
  BASE_URL: 'http://www.educoco.com',
  COLOR: {
    ORANGE: '#C50',
    DARKBLUE: '#0F3274',
    LIGHTBLUE: '#6EA8DA',
    DARKGRAY: '#999',
    BLUE: '#57c1f9',
    YELLOW: '#f7b822'

  },
  HEADER_FONTSIZE: 16,
  formatDateString: function(mongoDate, split){
    let dateObj = new Date(mongoDate);
    let month = String(dateObj.getMonth() + 1);
    let day = String(dateObj.getDate());
    let year = String(dateObj.getFullYear());
    //We can change format here, current format: year/month/day
    return  year.
            concat(split).
            concat(month).
            concat(split).
            concat(day);
  }
};

export { GLOBLE };
