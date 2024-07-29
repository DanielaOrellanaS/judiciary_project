const localUrl = 'https://rest-api-notification.onrender.com';
const apiUrl = 'http://127.0.0.1:8000';  

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

async function getJudgmentById(id) {
  try {
    const response = await fetch(`${apiUrl}/judgment/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch judgment with ID: ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching judgment with ID ${id}:`, error);
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

async function updateJudgment(id, data) {
  try {
    const response = await fetch(`${apiUrl}/judgment/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log("IDENTIFICADOR: ", id)
    console.log("DATA UPDATE: ", data)

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to update judgment');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error updating judgment:', error);
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

async function getOrders() {
  try {
    const response = await fetch(`${apiUrl}/orders/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

async function getOrdersByJudgmentId(idJudgment) {
  try {
    const response = await fetch(`${apiUrl}/orders/by_judgment/${idJudgment}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch orders with Judgment ID: ${idJudgment}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching orders with Judgment ID ${idJudgment}:`, error);
    throw error;
  }
}

async function getBankResponseById(id) {
  try {
    const response = await fetch(`${apiUrl}/bank_response/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch bank response with ID: ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching bank response with ID ${id}:`, error);
    throw error;
  }
}



async function saveOrders(data) {
  try {
    const response = await fetch(`${apiUrl}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to save orders data');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error saving orders:', error);
    throw error;
  }
}

async function saveBankOrderDetail(data) {
  try {
    const response = await fetch(`${apiUrl}/bank_order_details/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to save bank order details data');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error saving bank order details:', error);
    throw error;
  }
}

export { getJudgment, getJudgmentById, saveJudgment, updateJudgment, getBankResponse, getBankResponseById, getOrders, getOrdersByJudgmentId, saveOrders, saveBankOrderDetail }