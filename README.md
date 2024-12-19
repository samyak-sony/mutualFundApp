# Mutual Funds Management API 

This project provides an API for managing mutual funds and their allocation to various investment baskets. You can perform operations such as listing mutual funds, adding new mutual funds, searching by name or ticker, and managing baskets categorized by risk levels (Low, Medium, and High).

## Table of Contents

- Getting Started
  - Prerequisites
  - Configuration
- API Endpoints
  - Mutual Funds
  - Baskets


## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Configuration

1. Create a `.env` file in the root directory with the following environment variables:

   ```
   DB_USER="your username"
   DB_PASSWORD="your password"
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME="your database name"
   ```


## API Endpoints

### Mutual Funds

#### 1. List All Mutual Funds (GET)

- **Endpoint:** `/api/mutualfunds/`

- **Description:** Retrieve a list of all mutual funds in the database.

- **Example Response:**

```json
  
  [ 
  
    {
      "id": 100034,

  ​    "name": "Aditya Birla Sun Life Equity Advantage Fund -Regular - IDCW",

  ​    "ticker": "FUND-100034",

  ​    "price": "141.68000" 

  },
    {
      "id": 100035,

  ​    "name": "Birla Sun Life Freedom Fund-Plan A (Dividend)",

  ​    "ticker": "FUND-100035",

  ​    "price": "14.55000" 

  }
  ]
```

#### 2. Search Mutual Fund (GET)

- **Endpoint:** `/api/mutualfunds/search`

- **Description:** Search mutual funds by their name or ticker.

- **Query Parameter:**
  `query`: The search term.

- **Example Request:** `/api/mutualfunds/search?query=Equity`

- **Example Response:**

  ```json
  [
      {
          "id": 100027,
          "name": "Grindlays Super Saver Income Fund-GSSIF-Half Yearly Dividend",
          "ticker": "FUND-100027",
          "price": "10.72050"
      }
  ]
  ```

#### 3. Add New Mutual Funds (POST)

- **Endpoint:** `/api/mutualfunds/`

- **Description:** Add multiple mutual funds to the database.

- **Example Request Body:**

  ```json
  {
    "mutualFunds": [
      {
        "name": "Grindlays Super Saver Income Fund-GSSIF-Half Yearly Dividend",
        "ticker": "FUND-100027",
        "price": 10.72050
      },
      {
        "name": "HP Income Fund",
        "ticker": "HIF",
        "price": 102.50
      }
    ]
  }
  ```

- **Example Response:**

  ```json
  {
    "message": "Mutual funds added successfully"
  }
  ```

#### 4. Get Mutual Fund Details (GET)

- **Endpoint:** `/api/mutualfunds/:mutualFundId`

- **Description:** Retrieve details of a specific mutual fund by its ID.

- **Example Response:**

  ```json
  {
      "id": 1,
      "name": "Lucki Fund",
      "ticker": "LFG",
      "price": "150.75000"
  }
  ```

### Baskets

#### 1. Get All Baskets by Risk Category (GET)

- **Endpoint:** `/api/baskets/:riskCategory`

- **Description:** Retrieve baskets filtered by risk level (`Low`, `Medium`, or `High`).

- **Example Response:**

  ```json
  [
      {
          "id": 7,
          "name": "My New Basket",
          "risk_category": "Low-Risk"
      }
  ]
  ```

#### 2. Create a New Basket (POST)

- **Endpoint:** `/api/baskets/:riskCategory`
- **Description:** Create a new basket with a name and risk category.
- **Example Request Body:**
 ```json
{
  "name": "My New Basket"
 }`
```

- **Example Response:**

```json
    {
    "id": 7,
    "name": "My New Basket",
    "risk_category": "Low-Risk"
    }
```
#### 3. Get Basket Details (GET)

- **Endpoint:** `/api/baskets/:basketId/details`

- **Description:** Retrieve details of all mutual funds within a specific basket.

- **Example Response:**

  ```json
  [
      {
          "id": 100028,
          "name": "Grindlays Super Saver Income Fund-GSSIF-Quaterly Dividend",
          "weight": "30.00"
      },
      {
          "id": 100029,
          "name": "Grindlays Super Saver Income Fund-GSSIF-Growth",
          "weight": "30.00"
      }
  ]
  ```

#### 4. Add Mutual Fund to Basket (POST)

- **Endpoint:** `/api/baskets/:basketId/mutualfunds`

- **Description:** Add a mutual fund to a specific basket, with a weight allocation.

- **Example Request Body:**

  ```json
  {

   "mutual_fund_id": 100029,

   "weight": 30

  }
  ```

- **Example Response:**

  ```json
  {
      "id": 3,
      "baskets_id": 5,
      "mutual_fund_id": 100029,
      "weight": "30.00"
  }
  ```

#### 5. Remove Mutual Fund from Basket (DELETE)

- **Endpoint:** `/api/baskets/:basketId/mutualfunds/:mutualFundId`

- **Description:** Remove a mutual fund from a basket.

- **Example Response:**

  ```json
  {
      "message": "Mutual fund remove from basket"
  }
  ```
