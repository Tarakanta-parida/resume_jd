import pdfplumber
import logging

logger = logging.getLogger("ats-optimizer")

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extracts text from a PDF file using pdfplumber.
    """
    text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        logger.error(f"pdfplumber extraction failed: {e}")
        raise Exception("Failed to extract text from PDF file.")

    return text
