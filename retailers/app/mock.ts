export const retailers = {
    "retailers":[
        {
            "id":"ret_001",
            "name":"Homa Bay Fashion Hub",
            "created_at":"2024-05-15T08:00:00Z"
        }
    ],
    "users":[
        {
            "id":"user_001",
            "retailer_id":"ret_001",
            "email":"john@homabayfashion.com",
            "role":"admin"
        },
        {
            "id":"user_002",
            "retailer_id":"ret_001",
            "email":"mary@homabayfashion.com",
            "role":"sales"
        }
    ],
    "customers":[
        {
            "id":"cust_001",
            "retailer_id":"ret_001",
            "phone":"+254722111222",
            "name":"Sarah K.",
            "first_purchase":"2024-05-01",
            "last_purchase":"2024-05-20",
            "total_spent":12500
        },
        {
            "id":"cust_002",
            "retailer_id":"ret_001",
            "phone":"+254733444555",
            "name":"James M.",
            "first_purchase":"2024-05-15",
            "last_purchase":"2024-05-18",
            "total_spent":8400
        },
        {
            "id":"cust_003",
            "retailer_id":"ret_001",
            "phone":"+254700999888",
            "name":"Lady W.",
            "first_purchase":"2024-05-10",
            "last_purchase":"2024-05-10", //Churned customer
            "total_spent":3500
        }
    ],
    "sales":[
        {
            "id":"sale_001",
            "retailer_id":"ret_001",
            "customer_id":"cust_001",
            "amount":4500,
            "items":[
                {
                    "name":"Designer Dress",
                    "price":4500
                }
            ],
            "created_at":"2024-05-20T14:30:00Z"
        },
        {
            "id":"sale_002",
            "retailer_id":"ret_001",
            "customer_id":"cust_001",
            "amount":8000,
            "items":[
                {
                    "name":"Handbag",
                    "price":8000
                }
            ],
            "created_at":"2024-05-01T11:15:00Z"
        }
    ],
    "campaigns":[
        {
            "id":"camp_001",
            "retailer_id":"ret_001",
            "name":"Loyalty Discount",
            "type":"whatsapp",
            "criteria":"last_purchase > 30 days ago",
            "sent_to":["cust_003"],
            "message":"Hi Lydia! Enjoy 15% off your next purchase!",
            "status":"sent",
            "created_at":"2024-05-19T10:00:00Z"
        }
    ],
    "analytics":{
        "retailer_id":"ret_001",
        "date_range":"2024-05-01 to 2024-05-20",
        "metrics":{
            "new_customers":1,
            "repeat_customers":2,
            "repeat_rate":"66.7%",
            "churn_rate":"33.3%",
            "avg_clv":"KES 8,133",
            "revenue_trends":{
                "weekly":[
                    {"week":"2024-05-13", "revenue":0},
                    {"week":"2024-05-06", "revenue":8000},
                    {"week":"2024-05-29", "revenue":8400},
                ],
                "daily":[
                    {"date":"2024-05-20", "revenue":4500},
                    {"date":"2024-05-19", "revenue":0},
                    {"date":"2024-05-18", "revenue":8400},
                ]
            },
            "top_customers":[
                {
                    "id":"cust_001",
                    "name":"Sarah K.",
                    "total_spent":12500,
                    "last_purchase":"3 days ago"
                },
                {
                    "id":"cust_002",
                    "name":"James M.",
                    "total_spent":8400,
                    "last_purchase":"2 days ago"
                },
            ]
        }
    }
}