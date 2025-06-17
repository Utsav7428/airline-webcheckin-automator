from models.boarding_pass import BoardingPass
import random
from datetime import datetime, timedelta
import asyncio

async def generate_boarding_pass(pnr: str, last_name: str) -> BoardingPass:
    """
    Generate a boarding pass for SpiceJet flights.
    In a real implementation, this would connect to SpiceJet's API or database.
    """
    # Simulate API call delay
    await asyncio.sleep(1)
    
    # Generate random flight details for demonstration
    flight_number = f"SG-{random.randint(100, 999)}"
    departure = random.choice(["DEL", "BOM", "BLR", "MAA", "HYD"])
    arrival = random.choice(["DEL", "BOM", "BLR", "MAA", "HYD"])
    while arrival == departure:
        arrival = random.choice(["DEL", "BOM", "BLR", "MAA", "HYD"])
    
    # Generate random date within next 7 days
    flight_date = datetime.now() + timedelta(days=random.randint(1, 7))
    date_str = flight_date.strftime("%Y-%m-%d")
    
    # Generate random seat
    row = random.randint(1, 30)
    seat_letter = random.choice("ABCDEF")
    seat = f"{row}{seat_letter}"
    
    # Generate random gate
    gate = f"G{random.randint(1, 20)}"
    
    # Calculate boarding time (30 minutes before departure)
    departure_time = datetime.strptime(f"{date_str} {random.randint(0, 23):02d}:{random.randint(0, 59):02d}", "%Y-%m-%d %H:%M")
    boarding_time = (departure_time - timedelta(minutes=30)).strftime("%H:%M")
    
    return BoardingPass(
        passengerName=f"{last_name.upper()}",
        flightNumber=flight_number,
        departure=departure,
        arrival=arrival,
        date=date_str,
        seat=seat,
        gate=gate,
        boardingTime=boarding_time,
        pnr=pnr,
        bookingReference=f"SG{random.randint(100000, 999999)}"
    ) 