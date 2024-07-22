const apiUrl = 'https://rest-api-notification.onrender.com';
const localUrl = 'http://127.0.0.1:8000';  

async function getJudgment() {
  try {
    const response = await fetch(`${apiUrl}/judgment/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch judgments');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching judgments:', error);
    throw error;
  }
}

async function saveJudgment(data) {
  try {
    const response = await fetch(`${apiUrl}/judgment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log("DATA ENVIADA: ", JSON.stringify(data))

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to save judgment data');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error saving judgment:', error);
    throw error;
  }
}

async function getBankResponse() {
  try {
    const response = await fetch(`${apiUrl}/bank_response/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch bank response');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bank response:', error);
    throw error;
  }
}

export { getJudgment, saveJudgment, getBankResponse }