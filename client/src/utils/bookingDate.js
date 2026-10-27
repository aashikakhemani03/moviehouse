const toDateInputValue = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const getBookingDateWindow = (now = new Date()) => {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const lastDayOfNextMonth = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth() + 1,
        0
    ).getDate();

    nextMonth.setDate(Math.min(today.getDate(), lastDayOfNextMonth));

    return {
        min: toDateInputValue(today),
        max: toDateInputValue(nextMonth)
    };
};

export const isDateWithinBookingWindow = (value, now = new Date()) => {
    if (!value) return false;

    const { min, max } = getBookingDateWindow(now);
    return value >= min && value <= max;
};