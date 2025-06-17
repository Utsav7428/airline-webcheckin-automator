from pydantic import BaseModel, Field
from typing import Optional

class BoardingPassRequest(BaseModel):
    pnr: str = Field(..., min_length=6, max_length=6, description="6-character PNR number")
    lastName: str = Field(..., description="Passenger's last name")
    airline: str = Field(..., description="Airline code")

class BoardingPass(BaseModel):
    passengerName: str
    flightNumber: str
    departure: str
    arrival: str
    date: str
    seat: str
    gate: str
    boardingTime: str
    pnr: str
    bookingReference: Optional[str] = None

class BoardingPassResponse(BaseModel):
    success: bool
    message: str
    boardingPass: Optional[BoardingPass] = None 