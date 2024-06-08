const facilities = {
  Clubhouse: {
    "10:00-16:00": 100,
    "16:00-22:00": 500,
  },
  "Tennis Court": {
    "00:00-24:00": 50,
  },
};

let bookings = [];

function parseTime(timeStr) {
  const [hour, minute] = timeStr.split(":").map(Number);
  return hour * 60 + minute;
}

// Function to check for overlapping bookings
function isOverlapping(newBooking, existingBooking) {
  return !(
    newBooking.end <= existingBooking.start ||
    newBooking.start >= existingBooking.end
  );
}

// Function to calculate booking cost
function calculateCost(facility, startTime, endTime) {
  const rates = facilities[facility];
  let cost = 0;
  let start = parseTime(startTime);
  let end = parseTime(endTime);

  for (let slot in rates) {
    const [slotStart, slotEnd] = slot.split("-").map(parseTime);
    if (start < slotEnd && end > slotStart) {
      const slotStartTime = Math.max(start, slotStart);
      const slotEndTime = Math.min(end, slotEnd);
      const hours = (slotEndTime - slotStartTime) / 60;
      cost += hours * rates[slot];
    }
  }
  return cost;
}

// Function to book a facility
function bookFacility(facility, date, startTime, endTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  for (let booking of bookings) {
    if (booking.facility === facility && booking.date === date) {
      if (isOverlapping({ start, end }, booking)) {
        return `Booking Failed, Already Booked`;
      }
    }
  }

  const cost = calculateCost(facility, startTime, endTime);
  bookings.push({ facility, date, start, end });
  return `Booked, Rs. ${cost}`;
}

// Sample input
const bookingRequests = [
  ["Clubhouse", "26-10-2020", "16:00", "22:00"],
  ["Tennis Court", "26-10-2020", "16:00", "20:00"],
  ["Clubhouse", "26-10-2020", "16:00", "22:00"],
  ["Tennis Court", "26-10-2020", "17:00", "21:00"],
];

// Process booking requests
for (let request of bookingRequests) {
  const [facility, date, startTime, endTime] = request;
  console.log(bookFacility(facility, date, startTime, endTime));
}
