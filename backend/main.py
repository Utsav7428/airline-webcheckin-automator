from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.boarding_pass import BoardingPassRequest, BoardingPassResponse
from airlines import indigo, air_india, spicejet, akasa

app = FastAPI(title="Airline Boarding Pass API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Airline mapping
AIRLINE_HANDLERS = {
    "indigo": indigo,
    "airindia": air_india,
    "spicejet": spicejet,
    "akasa": akasa
}

@app.get("/api/airlines")
async def get_airlines():
    """Get list of supported airlines with their branding information"""
    return {
        "airlines": [
            {"value": "indigo", "label": "IndiGo", "color": "from-indigo-500 to-blue-600"},
            {"value": "airindia", "label": "Air India", "color": "from-red-500 to-orange-600"},
            {"value": "spicejet", "label": "SpiceJet", "color": "from-red-600 to-yellow-500"},
            {"value": "akasa", "label": "Akasa Air", "color": "from-purple-500 to-pink-600"}
        ]
    }

@app.post("/api/boarding-pass", response_model=BoardingPassResponse)
async def generate_boarding_pass(request: BoardingPassRequest):
    """Generate boarding pass for the given PNR and airline"""
    if request.airline not in AIRLINE_HANDLERS:
        raise HTTPException(status_code=400, detail="Unsupported airline")
    
    try:
        handler = AIRLINE_HANDLERS[request.airline]
        boarding_pass = await handler.generate_boarding_pass(request.pnr, request.lastName)
        return BoardingPassResponse(
            success=True,
            message="Boarding pass generated successfully",
            boardingPass=boarding_pass
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 