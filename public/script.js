document.addEventListener("DOMContentLoaded", function () {
    const csvFileInput = document.getElementById("csvFile");
    const uploadButton = document.getElementById("uploadButton");
    const chartDiv = document.getElementById("chart");
    const chartDiv_pie = document.getElementById("chart_pie");
    const chartDiv_hist = document.getElementById("chart_hist");
    const dropdown = document.getElementById("fieldToVisualize");
    const dropdown_pie= document.getElementById('fieldToVisualizepie');
    const dropdown_hist= document.getElementById('fieldToVisualizehist');
    const dropdownquery = document.getElementById('queryOption');
    const querycol= document.getElementById('querycol');
    const querycol_val= document.getElementById('queryval');
    let csvData; // Store CSV data

    // Event listener for the file input
    csvFileInput.addEventListener("change", function () {
        const file = event.target.files[0];
        if(!file)
        {
            // dispaly err message here
        }
        if (file) {
            // Read the contents of the uploaded CSV file
            const reader = new FileReader();
            reader.onload = function (e) {
                csvData = e.target.result;
                populateDropdown(csvData);
            };
            reader.readAsText(file);
        }
    });

      

    function populateDropdown(csvData) {
        const lines = csvData.split("\n");
        const headers = lines[0].split(",");
    
        // Clear existing options
        dropdown.innerHTML = "";
        dropdown_pie.innerHTML = "";
        dropdown_hist.innerHTML="";
        dropdownquery.innerHTML="";
        // Add an empty default option for the first dropdown
        const defaultOptionDropdown = document.createElement("option");
        defaultOptionDropdown.value = "";
        defaultOptionDropdown.textContent = "Select a field to visualize";
        dropdown.appendChild(defaultOptionDropdown);
    
        // Add an empty default option for the second dropdown
        const defaultOptionDropdownPie = document.createElement("option");
        defaultOptionDropdownPie.value = "";
        defaultOptionDropdownPie.textContent = "Select a field to visualize";
        dropdown_pie.appendChild(defaultOptionDropdownPie);


        const defaultOptionDropdownhist = document.createElement("option");
        defaultOptionDropdownhist.value = "";
        defaultOptionDropdownhist.textContent = "Select a field to visualize";
        dropdown_hist.appendChild(defaultOptionDropdownhist);
    


        
        const defaultOptionDropdownquery = document.createElement("option");
        defaultOptionDropdownquery.value = "";
        defaultOptionDropdownquery.textContent = "Select a field to perform query";
        dropdownquery.appendChild(defaultOptionDropdownquery);
    




        // Add options for each field in the CSV
        headers.forEach((header) => {
            const option = document.createElement("option");
            option.value = header;
            option.textContent = header;
            dropdown.appendChild(option);
            dropdown_pie.appendChild(option.cloneNode(true));
            dropdown_hist.appendChild(option.cloneNode(true));
            dropdownquery.appendChild(option.cloneNode(true));
            // Use cloneNode to create a copy
        });
    }
    

    // Event listener for the dropdown
    dropdown.addEventListener("change", function () {
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        const fieldToVisualize = selectedOption.value;
        if (fieldToVisualize) {
            createChart(fieldToVisualize);
        }
    });


    dropdown_pie.addEventListener("change", function () {
        const selectedOption_2 = dropdown_pie.options[dropdown_pie.selectedIndex];
        const fieldToVisualize_2 = selectedOption_2.value;
        if (fieldToVisualize_2) {
           console.log(fieldToVisualize_2);
             createPieChart(fieldToVisualize_2);
        }
    });


    dropdown_hist.addEventListener("change", function () {
        const selectedOption_3 = dropdown_hist.options[dropdown_hist.selectedIndex];
        const fieldToVisualize_3 = selectedOption_3.value;
        if (fieldToVisualize_3) {
           console.log(fieldToVisualize_3);
           createHistogram(fieldToVisualize_3);
        }
    });




    // document.getElementById("executeQueryButton2").addEventListener("click", function () {
    

       
    //     const queryfield =querycol.value ;
    //     const query_value=querycol_val.value;
    //     console.log("lakshinnnn");
    //     console.log(queryfield+"  and   "+query_value);
       
    //     let queryfinal; 
    //         queryfinal = { "Column": String(queryfield) , "Val": String(query_value) };
       
    
    //     // Make an AJAX request to execute the query
    //     fetch("/newquery", {
    //         method: "POST",
    //         body: JSON.stringify({ querysecond: queryfinal }),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log("Query results:");
    //             console.log(data);
    
               
    //             const queryResultText = document.getElementById("queryResultText2");
    //             console.log("abcd");
    //             console.log(queryResultText);
    //             console.log("efgh");
    //             queryResultText.textContent = JSON.stringify(data, null, 2);
    
    //             // You can further process and display the query results as needed
    //         })
    //         .catch((error) => {
    //             console.error("Fetch error:", error);
    //         });


    // });

// aa che
    // document.getElementById("executeQueryButton2").addEventListener("click", function () {
    //     const queryfield = querycol.value;
    //     const query_value = querycol_val.value;
    
    //     let queryfinal;
    //     queryfinal = { "Column": String(queryfield), "Val": String(query_value) };
    
    //     // Make an AJAX request to execute the query
    //     fetch("/newquery", {
    //         method: "POST",
    //         body: JSON.stringify({ querysecond: queryfinal }),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log("Query results:");
    //         console.log(data);
    
    //         const queryResultText = document.getElementById("queryResultText2");
    //         queryResultText.innerHTML = ""; // Clear previous content
    
    //         // Check if the data is an array
    //         if (Array.isArray(data)) {
    //             const otherColumnsTable = document.createElement("table");
    //             otherColumnsTable.className = "table"; // Add Bootstrap table class
    
    //             const otherColumnsBody = otherColumnsTable.createTBody();
                
    //             // Iterate through each result and add to the table
    //             data.forEach(result => {
    //                 const otherColumns = result.otherColumns
    //                     .split(",")
    //                     .map(pair => pair.split(":").map(item => item.trim()));
    
    //                 for (const [key, value] of otherColumns) {
    //                     // Exclude _id property
    //                     if (key !== "_id") {
    //                         const row = otherColumnsBody.insertRow(otherColumnsBody.rows.length);
    //                         row.insertCell(0).innerHTML = key;
    //                         row.insertCell(1).innerHTML = value;
    //                     }
    //                 }
    //             });
    
    //             // Append the table to the queryResultText element
    //             queryResultText.appendChild(otherColumnsTable);
    //         } else {
    //             // If data is not an array, display it as plain text
    //             queryResultText.textContent = JSON.stringify(data, null, 2);
    //         }
    //     })
    //     .catch((error) => {
    //         console.error("Fetch error:", error);
    //     });
    // });
    
    







    document.getElementById("executeQueryButton2").addEventListener("click", function () {
        const queryfield = querycol.value;
        const query_value = querycol_val.value;
    
        let queryfinal;
        queryfinal = { "Column": String(queryfield), "Val": String(query_value) };
    
        // Make an AJAX request to execute the query
        fetch("/newquery", {
            method: "POST",
            body: JSON.stringify({ querysecond: queryfinal }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Query results:");
            console.log(data);
    
            const queryResultText = document.getElementById("queryResultText2");
            queryResultText.innerHTML = ""; // Clear previous content
    
            // Check if the data is an array
            if (Array.isArray(data) && data.length > 0) {
                const otherColumnsTable = document.createElement("table");
                otherColumnsTable.className = "table"; // Add Bootstrap table class
    
                const otherColumnsBody = otherColumnsTable.createTBody();
    
                // Extract field names excluding "_id" from the first result
                const fieldNames = data[0].otherColumns
                    .split(",")
                    .map(pair => pair.split(":").map(item => item.trim()))
                    .filter(([fieldName]) => fieldName !== "_id")
                    .map(([fieldName]) => fieldName);
    
                // Create the header row
                const headerRow = otherColumnsBody.insertRow(otherColumnsBody.rows.length);
                fieldNames.forEach(fieldName => {
                    const th = document.createElement("th");
                    th.innerHTML = fieldName;
                    headerRow.appendChild(th);
                });
    
                // Iterate through each result and add to the table
                data.forEach(result => {
                    const otherColumns = result.otherColumns
                        .split(",")
                        .map(pair => pair.split(":").map(item => item.trim()));
    
                    // Create a new row for each result
                    const row = otherColumnsBody.insertRow(otherColumnsBody.rows.length);
    
                    // Iterate through field values and add to the row
                    fieldNames.forEach((fieldName, index) => {
                        row.insertCell(index).innerHTML = otherColumns
                            .filter(([name]) => name === fieldName)
                            .map(([, value]) => value)
                            .join(":");
                    });
                });
    
                // Append the table to the queryResultText element
                queryResultText.appendChild(otherColumnsTable);
            } else {
                // If data is not an array or is empty, display it as plain text
                queryResultText.textContent = JSON.stringify(data, null, 2);
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
    });
    






    // queryOption.addEventListener("change", function () {
    //     const opt = queryOption.options[queryOption.selectedIndex];
    //     const queryfield = opt.value;
    
    //     if (queryfield) {
    //         // Read the contents of the uploaded CSV file
    //         const fileInput = document.getElementById("csvFile");
    //         const file = fileInput.files[0];
    
    //         if (file) {
    //             const reader = new FileReader();
    //             reader.onload = function (e) {
    //                 const csvData = e.target.result;
    //                 const data = extractColumnData(csvData, queryfield);
    //                 const stats = calculateStatistics(data, queryfield);
    
    //                 // Display the queryResultTextsecond with the results
    //                 const queryResultText = document.getElementById("queryResultTextsecond");
    //                 queryResultText.innerHTML = ""; // Clear previous content
    
    //                 for (const column in stats) {
    //                     const columnStats = stats[column];
    //                     const columnResult = document.createElement("div");
    //                     columnResult.innerHTML = `<strong>${column}</strong>: <br>${JSON.stringify(columnStats, null, 2)}`;
    //                     queryResultText.appendChild(columnResult);
    //                 }
    //             };
    
    //             reader.readAsText(file);
    //         }
    //     }
    // });
    


    
    queryOption.addEventListener("change", function () {
        const opt = queryOption.options[queryOption.selectedIndex];
        const queryfield = opt.value;
        console.log("lakshit "+queryfield);
        if (queryfield) {
            // Read the contents of the uploaded CSV file
            const fileInput = document.getElementById("csvFile");
            const file = fileInput.files[0];
    
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const csvData = e.target.result;
                    const data = extractColumnData(csvData, queryfield);
                    const stats = calculateStatistics(data, queryfield);
    
                    // Display the queryResultTextsecond with the results
                    const queryResultText = document.getElementById("queryResultTextsecond");
                    queryResultText.innerHTML = ""; // Clear previous content
    
                    // Log stats to console for debugging
                    console.log("Stats:", stats);
    
                    // Create a table for mean, variance, mode
                    const table = document.createElement("table");
                    table.className = "table"; // Bootstrap table styling





                    console.log("haha");
                    // Assuming stats is the object you provided
                  //  const meanValue2 = stats[queryfield].mean;

            // Now you can use meanValue as needed
           // console.log("Mean Value:", meanValue2);




                    // Create table header
                    const headerRow = table.createTHead().insertRow(0);
                    headerRow.insertCell(0); // Empty cell for spacing
                    const headerCellMean = headerRow.insertCell(1);
                    headerCellMean.innerHTML = "<strong>Mean</strong>";
                    const headerCellVariance = headerRow.insertCell(2);
                    headerCellVariance.innerHTML = "<strong>Variance</strong>";
                    const headerCellMode = headerRow.insertCell(3);
                    headerCellMode.innerHTML = "<strong>Mode</strong>";
    
                    // Create table body
                    const body = table.createTBody();
                    const row = body.insertRow(0);
    
                    // Column name
                    const columnNameCell = row.insertCell(0);
                    columnNameCell.innerHTML = `<strong>${queryfield}</strong>`;
    
                    // Mean value
                    const meanValueCell = row.insertCell(1);
                    meanValueCell.innerHTML = stats[queryfield].mean !== undefined ? stats[queryfield].mean : '';
    
                    // Variance value
                    const varianceValueCell = row.insertCell(2);
                    varianceValueCell.innerHTML = (stats[queryfield].standardDeviation)*(stats[queryfield].standardDeviation)!== undefined ? (stats[queryfield].standardDeviation)*(stats[queryfield].standardDeviation) : '';
    
                    // Mode value
                    const modeValueCell = row.insertCell(3);
                    modeValueCell.innerHTML = Array.isArray(stats[queryfield].mode) ? stats[queryfield].mode.join(', ') : '';
    

                    
                    console.log(stats[queryfield].valueFrequency);
                    //console.log(stats.ExchangeRate.mean);
                    console.log("kjl");

                    // Append the table to the result text element
                    queryResultText.appendChild(table);
    
                    // Create a table for value frequency
                    const frequencyTable = document.createElement("table");
                    frequencyTable.className = "table"; // Bootstrap table styling
    
                    // Create table header for value and frequency
                    const frequencyHeaderRow = frequencyTable.createTHead().insertRow(0);
                    frequencyHeaderRow.insertCell(0).innerHTML = "<strong>Value</strong>";
                    frequencyHeaderRow.insertCell(1).innerHTML = "<strong>Frequency</strong>";
    
                    // Create table body for value and frequency
                    // const frequencyBody = frequencyTable.createTBody();
                    // for (const it in stats[queryfield].valueFrequency) {
                    //     const frequencyRow = frequencyBody.insertRow(frequencyBody.rows.length);
                    //     frequencyRow.insertCell(0).innerHTML = it;
                    //     frequencyRow.insertCell(1).innerHTML = it[value];
                    // }
                    const frequencyBody = frequencyTable.createTBody();

for (const key in stats[queryfield].valueFrequency) {
    const value = stats[queryfield].valueFrequency[key];

    const frequencyRow = frequencyBody.insertRow(frequencyBody.rows.length);
    frequencyRow.insertCell(0).innerHTML = key;
    frequencyRow.insertCell(1).innerHTML = value;
}

                    // Append the frequency table to the result text element
                    queryResultText.appendChild(frequencyTable);
                };
    
                reader.readAsText(file);
            }
        }
    });
    





































    // function extractColumnData(csvData, queryfield) {
    //     // Parse the CSV data into an array of objects
    //     const lines = csvData.split("\n");
    //     const data = [];
    //     const headers = lines[0].split(",");
    //     for (let i = 1; i < lines.length; i++) {
    //         const currentLine = lines[i].split(",");
    //         if (currentLine.length === headers.length) {
    //             const item = {};
    //             for (let j = 0; j < headers.length; j++) {
    //                 item[headers[j]] = currentLine[j];
    //             }
    //             data.push(item);
    //         }
    //     }
    
    //     // Extract the data for the selected column
    //     const columnData = data.map((item) => item[queryfield]);
    
    //     return columnData;
    // }

    function extractColumnData(csvData, queryfield) {
        // Parse the CSV data into an array of objects
        const lines = csvData.split("\n");
        const data = [];
        const headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(",");
            if (currentLine.length === headers.length) {
                const item = {};
                let isValidRow = true;
    
                for (let j = 0; j < headers.length; j++) {
                    const trimmedValue = currentLine[j].trim();
    
                    // Check for NaN or empty values
                    if (trimmedValue === '' || trimmedValue.toLowerCase() === 'nan') {
                        isValidRow = false;
                        break; // Break out of the loop if NaN or empty value is found
                    }
    
                    item[headers[j]] = currentLine[j];
                }
    
                if (isValidRow) {
                    data.push(item);
                }
            }
        }
    
        // Extract the data for the selected column
        const columnData = data.map((item) => item[queryfield]);
    
        return columnData;
    }
    
    
    function calculateStatistics(data, queryfield) {
        // Calculate statistical measures for the selected column
        const stats = {};
    
        // Assuming the response contains an array of values for the selected column
        const values = data.map((item) => parseFloat(item));
    
        // Calculate statistical measures
        const mean = math.mean(values);
        const median = math.median(values);
        const mode = math.mode(values);
        const standardDeviation = math.std(values);
       // const variance = math.var(values);
    
        // Calculate frequency of values
        const valueCounts = {};
        values.forEach((value) => {
            valueCounts[value] = (valueCounts[value] || 0) + 1;
        });
    
        // Sort values by frequency in descending order
       // const sortedValues = Object.keys(valueCounts).sort((a, b) => valueCounts[b] - valueCounts[a]);
    
        // Store the statistics for the selected column
        stats[queryfield] = {
            mean: mean,
            median: median,
            mode: mode,
            standardDeviation: standardDeviation,
           // variance: variance,
            valueFrequency: valueCounts,
            //sortedValues: sortedValues,
        };
    
        return stats;
    }
     

    
   
    function createHistogram(fieldToVisualize) {
        if (!csvData) {
            alert("Please upload a CSV file first.");
            return;
        }
    
        // Parse the CSV data into an array of objects
        const lines = csvData.split("\n");
        const data = [];
        const headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(",");
            if (currentLine.length === headers.length) {
                const item = {};
                for (let j = 0; j < headers.length; j++) {
                    item[headers[j]] = currentLine[j];
                }
                data.push(item);
            }
        }
    
        // Extract the data for visualization
        const fieldData = data.map((item) => parseFloat(item[fieldToVisualize])); // Assuming the field is numerical
    
        // Create a histogram using Plotly
        const trace = {
            x: fieldData,
            type: "histogram",
        };
    
        const layout = {
            title: "Histogram Title",
            xaxis: {
                title: "X-Axis Title",
            },
            yaxis: {
                title: "Frequency",
            },
        };
    
        Plotly.newPlot(chartDiv_hist, [trace], layout);
    
        // Make an AJAX request to upload CSV data (if needed)
        // Replace the endpoint and data as per your server configuration
        fetch("/upload", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    



















    function createPieChart(fieldToVisualize) {
        if (!csvData) {
            alert("Please upload a CSV file first.");
            return;
        }
    
        // Parse the CSV data into an array of objects
        const lines = csvData.split("\n");
        const data = [];
        const headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(",");
            if (currentLine.length === headers.length) {
                const item = {};
                for (let j = 0; j < headers.length; j++) {
                    item[headers[j]] = currentLine[j];
                }
                data.push(item);
            }
        }
    
        // Extract the data for visualization
        const fieldData = data.map((item) => item[fieldToVisualize]);
    
        // Count occurrences of each unique value for the pie chart
        const valueCounts = {};
        fieldData.forEach((value) => {
            valueCounts[value] = (valueCounts[value] || 0) + 1;
        });
    
        // Create data for the pie chart
        const pieData = [{
            labels: Object.keys(valueCounts),
            values: Object.values(valueCounts),
            type: "pie",
        }];
    
        const layout = {
            title: "Pie Chart Title",
        };
    
        Plotly.newPlot(chartDiv_pie, pieData, layout);
    
        // Make an AJAX request to upload CSV data (if needed)
        // Replace the endpoint and data as per your server configuration
        fetch("/upload", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    



    

    function createChart(fieldToVisualize) {
        if (!csvData) {
            alert("Please upload a CSV file first.");
            return;
        }

        // Parse the CSV data into an array of objects
        const lines = csvData.split("\n");
        const data = [];
        const headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(",");
            if (currentLine.length === headers.length) {
                const item = {};
                for (let j = 0; j < headers.length; j++) {
                    item[headers[j]] = currentLine[j];
                }
                data.push(item);
            }
        }

        // Extract the data for visualization
        const fieldData = data.map((item) => item[fieldToVisualize]);

        // Create a bar chart using Plotly
        const trace = {
            x: fieldData,
            type: "bar",
        };

        const layout = {
            title: "Chart Title",
            xaxis: {
                title: "X-Axis Title",
            },
            yaxis: {
                title: "Y-Axis Title",
            },
        };

        Plotly.newPlot(chartDiv, [trace], layout);

        // Make an AJAX request to upload CSV data
        fetch("/upload", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }





    // Event listener for executing MongoDB queries
    // document.getElementById("executeQueryButton").addEventListener("click", function () {
    //     const queryInput = document.getElementById("sqlQuery");
    //     const sqlQuery = queryInput.value;
    //     if (sqlQuery.trim() === "") {
    //         alert("Please enter a MongoDB query.");
    //         return;
    //     }

    //     // Make an AJAX request to execute the user's MongoDB query
    //     fetch("/query", {
    //         method: "POST",
    //         body: JSON.stringify({ query: sqlQuery }),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data); // Log the query results

    //             // Update the queryResultText with the results
    //             const queryResultText = document.getElementById("queryResultText");
    //             queryResultText.textContent = JSON.stringify(data, null, 2);

    //             // You can further process and display the query results as needed
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // });










});



// {
//     "Date": "03-01-2023"
//   }
  