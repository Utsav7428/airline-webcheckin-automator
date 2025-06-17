from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from models.boarding_pass import BoardingPass

def generate_boarding_pass_pdf(boarding_pass: BoardingPass, output_path: str) -> str:
    """
    Generate a PDF boarding pass for the given boarding pass data.
    Returns the path to the generated PDF file.
    """
    c = canvas.Canvas(output_path, pagesize=A4)
    width, height = A4

    # Add airline logo (placeholder)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(50, height - 50, "BOARDING PASS")

    # Add passenger information
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 100, f"Passenger: {boarding_pass.passengerName}")
    c.drawString(50, height - 120, f"Flight: {boarding_pass.flightNumber}")
    c.drawString(50, height - 140, f"From: {boarding_pass.departure}")
    c.drawString(50, height - 160, f"To: {boarding_pass.arrival}")
    c.drawString(50, height - 180, f"Date: {boarding_pass.date}")
    c.drawString(50, height - 200, f"Seat: {boarding_pass.seat}")
    c.drawString(50, height - 220, f"Gate: {boarding_pass.gate}")
    c.drawString(50, height - 240, f"Boarding Time: {boarding_pass.boardingTime}")
    c.drawString(50, height - 260, f"PNR: {boarding_pass.pnr}")
    
    if boarding_pass.bookingReference:
        c.drawString(50, height - 280, f"Booking Ref: {boarding_pass.bookingReference}")

    # Add barcode (placeholder)
    c.setFont("Helvetica", 8)
    c.drawString(50, height - 320, "Barcode Placeholder")

    c.save()
    return output_path 