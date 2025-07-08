// Enhanced color palettes
        const modernColors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ];

        const gradientColors = [
            'rgba(255, 107, 107, 0.8)',
            'rgba(78, 205, 196, 0.8)',
            'rgba(69, 183, 209, 0.8)',
            'rgba(150, 206, 180, 0.8)',
            'rgba(255, 234, 167, 0.8)',
            'rgba(221, 160, 221, 0.8)',
            'rgba(152, 216, 200, 0.8)',
            'rgba(247, 220, 111, 0.8)',
            'rgba(187, 143, 206, 0.8)',
            'rgba(133, 193, 233, 0.8)'
        ];

        function getOjectByid(data, id) {
            return data.find(e => e.id == id);
        }

        // Add your getAll function here
        // async function getAll(url) {
        //     // Your API call implementation
        // }

        async function showChart() {
            const orderData = await getAll(URL_ORDER);
            const data = [];

            orderData.forEach(element => {
                if (element.status === "paid") {
                    const total = element.bill.reduce(
                        (sum, item) => sum + getOjectByid(dataFood, item.idFood)?.price * item.quantity,
                        0
                    );

                    const found = data.find(d => d.id === element.tableId);
                    if (found) {
                        found.total += total;
                    } else {
                        data.push({ id: element.tableId, total });
                    }
                }
            });

            // Sắp xếp theo tổng doanh thu giảm dần
            data.sort((a, b) => b.total - a.total);

            const ctx = document.createElement("canvas");
            ctx.height = 400;
            document.querySelector(".bar-chart").innerHTML = "";
            document.querySelector(".bar-chart").appendChild(ctx);

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: data.map(e => `Table ${e.id}`),
                    datasets: [{
                        label: "Doanh thu",
                        data: data.map(e => e.total),
                        backgroundColor: gradientColors.slice(0, data.length),
                        borderColor: modernColors.slice(0, data.length),
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 8,
                            callbacks: {
                                label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue.toLocaleString()} VND`
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                callback: value => value.toLocaleString() + " VND"
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });

            // Update stats
            const totalRevenue = data.reduce((sum, item) => sum + item.total, 0);
            document.getElementById('totalRevenue').textContent = (totalRevenue / 1000).toLocaleString() + 'K';
        }

        async function showTopDishesChart() {
            const orders = await getAll(URL_ORDER);
            const dishes = await getAll(URL_DISH);

            const dishSales = {};

            orders.filter(o => o.status === "paid").forEach(order => {
                order.bill.forEach(item => {
                    if (!dishSales[item.idFood]) dishSales[item.idFood] = 0;
                    dishSales[item.idFood] += item.quantity;
                });
            });

            const labels = [];
            const data = [];

            for (let dishId in dishSales) {
                const dish = dishes.find(d => d.id === dishId);
                if (dish) {
                    labels.push(dish.name);
                    data.push(dishSales[dishId]);
                }
            }

            const ctx = document.createElement("canvas");
            ctx.height = 400;
            const container = document.querySelector(".top-dishes-chart");
            container.innerHTML = "";
            container.appendChild(ctx);

            new Chart(ctx, {
                type: "pie",
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: gradientColors.slice(0, labels.length),
                        borderColor: modernColors.slice(0, labels.length),
                        borderWidth: 2,
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 8,
                            callbacks: {
                                label: (ctx) => `${ctx.label}: ${ctx.parsed} món (${(ctx.parsed / data.reduce((sum, item) => sum + item, 0) * 100).toFixed(1)}%)`
                            }
                        }
                    }
                }
            });

            // Update stats
            document.getElementById('totalOrders').textContent = orders.filter(o => o.status === "paid").length;
            if (labels.length > 0) {
                const maxSales = Math.max(...data);
                const popularDish = labels[data.indexOf(maxSales)];
                document.getElementById('popularDish').textContent = popularDish;
            }
        }

        async function showUserBookingChart() {
            const tables = await getAll(URL_TABLE);

            const userCount = {};

            tables.forEach(table => {
                const username = table.bookedBy;
                if (username) {
                    userCount[username] = (userCount[username] || 0) + 1;
                }
            });

            const labels = Object.keys(userCount);
            const data = Object.values(userCount);

            const ctx = document.createElement("canvas");
            ctx.height = 400;
            const container = document.querySelector(".user-booking-chart");
            container.innerHTML = "";
            container.appendChild(ctx);

            new Chart(ctx, {
                type: "polarArea",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Số lần đặt bàn",
                        data: data,
                        backgroundColor: gradientColors.slice(0, labels.length),
                        borderColor: modernColors.slice(0, labels.length),
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 8,
                            callbacks: {
                                label: (ctx) => `${ctx.label}: Đặt bàn ${ctx.raw} lần`
                            }
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            pointLabels: {
                                font: {
                                    size: 12
                                }
                            },
                            ticks: {
                                display: true,
                                color: '#666'
                            }
                        }
                    }
                }
            });

            // Update stats
            if (labels.length > 0) {
                const maxBookings = Math.max(...data);
                const frequentCustomer = labels[data.indexOf(maxBookings)];
                document.getElementById('frequentCustomer').textContent = frequentCustomer;
            }
        }

        // Initialize dashboard
        async function initDashboard() {
            try {
                // Load data first
                const dataFood = await getAll(URL_DISH);
                
                // Make dataFood available globally
                window.dataFood = dataFood;
                
                // Initialize all charts
                await Promise.all([
                    showChart(),
                    showTopDishesChart(),
                    showUserBookingChart()
                ]);
            } catch (error) {
                console.error('Error initializing dashboard:', error);
                
                // Show error message to user
                document.querySelectorAll('.chart-container').forEach(container => {
                    container.innerHTML = '<div class="loading">⚠️ Lỗi tải dữ liệu. Vui lòng thử lại.</div>';
                });
            }
        }

        // Run dashboard when page loads
        document.addEventListener('DOMContentLoaded', initDashboard);