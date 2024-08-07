const localUrl = 'https://rest-api-notification.onrender.com';
const apiUrl = 'http://127.0.0.1:8000';  

export async function getJudgment() {
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

export async function getJudgmentById(id) {
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

export async function saveJudgment(data) {
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

export async function updateJudgment(id, data) {
  try {
    const response = await fetch(`${apiUrl}/judgment/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

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

export async function updateOrders(id, data) {
  try {
    const response = await fetch(`${apiUrl}/orders/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

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

export async function updateOrdersRetention(id, data) {
  try {
    const response = await fetch(`${apiUrl}/orders_retention/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

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

export async function updateOrdersRelease(id, data) {
  try {
    const response = await fetch(`${apiUrl}/orders_release/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

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

export async function updateOrdersSeizure(id, data) {
  try {
    const response = await fetch(`${apiUrl}/orders_seizure/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

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

export async function getBankResponse() {
  try {
    const response = await fetch(`${apiUrl}/bank_order_details/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response:', response);
    if (!response.ok) {
      throw new Error('Failed to fetch bank response');
    }
    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching bank response:', error);
    throw error;
  }
}

export async function getOrders() {
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

export async function getOrdersByJudgmentIdAndOrderType(idJudgment, orderType) {
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
    return data.filter(order => order.orderType === orderType);
  } catch (error) {
    console.error(`Error fetching orders with Judgment ID ${idJudgment}:`, error);
    throw error;
  }
}

export async function saveOrders(data) {
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


// RETENTION ORDER

export async function getOrdersRetention() {
  try {
    const response = await fetch(`${apiUrl}/orders_retention/`, {
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

export async function getOrdersRetentionByJudgmentIdAndOrderType(idJudgment, orderType) {
  try {
    const response = await fetch(`${apiUrl}/orders_retention/by_judgment/${idJudgment}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch orders with Judgment ID: ${idJudgment}`);
    }
    const data = await response.json();
    return data.filter(order => order.orderType === orderType);
  } catch (error) {
    console.error(`Error fetching orders with Judgment ID ${idJudgment}:`, error);
    throw error;
  }
}

export async function saveOrdersRetention(data) {
  try {
    const response = await fetch(`${apiUrl}/orders_retention/`, {
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

// RELEASE ORDER

export async function getOrdersRelease() {
  try {
    const response = await fetch(`${apiUrl}/orders_release/`, {
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

export async function getOrdersReleaseByJudgmentIdAndOrderType(idJudgment, orderType) {
  try {
    const response = await fetch(`${apiUrl}/orders_release/by_judgment/${idJudgment}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch orders with Judgment ID: ${idJudgment}`);
    }
    const data = await response.json();
    return data.filter(order => order.orderType === orderType);
  } catch (error) {
    console.error(`Error fetching orders with Judgment ID ${idJudgment}:`, error);
    throw error;
  }
}

export async function saveOrdersRelease(data) {
  try {
    const response = await fetch(`${apiUrl}/orders_release/`, {
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

// SEIZURE ORDER

export async function getOrdersSeizure() {
  try {
    const response = await fetch(`${apiUrl}/orders_seizure/`, {
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

export async function getOrdersSeizureByJudgmentIdAndOrderType(idJudgment, orderType) {
  try {
    const response = await fetch(`${apiUrl}/orders_seizure/by_judgment/${idJudgment}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch orders with Judgment ID: ${idJudgment}`);
    }
    const data = await response.json();
    return data.filter(order => order.orderType === orderType);
  } catch (error) {
    console.error(`Error fetching orders with Judgment ID ${idJudgment}:`, error);
    throw error;
  }
}

export async function saveOrdersSeizure(data) {
  try {
    const response = await fetch(`${apiUrl}/orders_seizure/`, {
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

export async function getBankResponseById(id) {
  try {
    const response = await fetch(`${apiUrl}/bank_order_details/${id}/`, {
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

export async function saveBankOrderDetail(data) {
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
