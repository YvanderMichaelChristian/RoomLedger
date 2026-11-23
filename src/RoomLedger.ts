import * as readline from 'readline'; // Imports Node.js's readline module so the program can read keyboard input
const rl = readline.createInterface({ // Creates a readline interface object (rl) used to ask questions and read answers
    input: process.stdin, // Input source: the keyboard (standard input)
    output: process.stdout, // Output destination: the terminal (standard output)
}); // Ends the readline interface configuration

const standardRoomPrice: number = 300000; // Declare Price per night of a Standard room (Rp300,000)
const deluxeRoomPrice: number = 500000; // Declare Price per night of a Deluxe room (Rp500,000)
const suiteRoomPrice: number = 800000; // Declare Price per night of a Suite room (Rp800,000)
const spaPrice: number = 150000; // Declare Fixed price of the spa service (Rp150,000)
const membershipDiscountsSilver: number = 50000; // Declare Fixed discount for Silver members (Rp50,000)
const membershipDiscountsGold: number = 100000; // Declare Fixed discount for Gold members (Rp100,000)
const membershipDiscountsPlatinum: number = 150000; // Declare Fixed discount for Platinum members (Rp150,000)
const sevenNightsDiscount: number = 0.05; // Declare Long-stay discount rate: 5% (applies to stays of 7+ nights)

console.log("==PRICES=="); // Prints the price list header
console.log("1. Standard Room - Rp" + standardRoomPrice); // Prints the Standard room price
console.log("2. Deluxe Room - Rp" + deluxeRoomPrice); // Prints the Deluxe room price
console.log("3. Suite Room - Rp" + suiteRoomPrice); // Prints the Suite room price
console.log("4. Spa - Rp" + spaPrice); // Prints the spa price

let roomType: string, // Declares a variable to store the room type input as string (text)
numberOfNights: number, // Declares a variable to store the number of nightsas number (number)
spaSelected: boolean, // Declares a variable to store whether spa is chosen as boolean (true/false)
membershipTier: string; // Declares a variable to store the membership tier the user types as string (text)

rl.question("Enter room type (Standard/Deluxe/Suite): ", (roomTypeInput) => { // Asks for the room type; the callback runs after the user presses Enter
    roomType = roomTypeInput.trim().toLowerCase();  // Removes extra spaces and converts the input to lowercase so it can match the switch cases
    rl.question("Enter number of nights: ", (nightsInput) => { // Asks for the number of nights; callback receives the typed text
        numberOfNights = Number(nightsInput.trim()); // Removes spaces and converts the text to a number (becomes NaN if not numeric)
        if (!Number.isInteger(numberOfNights) || numberOfNights < 1) { // Checks if the value is not a whole number OR is less than 1 (invalid)
            console.log("Please Enter A Valid Number") // Tells the user the nights input is invalid
            rl.close(); // Closes the readline interface (ends the program's input)
            return; // Exits the callback so no further questions are asked
        } // Ends the validation if-block
        rl.question("Do you want to include spa service? (yes/no): ", (spaInput) => { // Asks whether the guest wants spa service
            spaSelected = spaInput.trim().toLowerCase() === 'yes'; // Sets true only if the answer is "yes" while any other answer = false
            console.log("Membership Tiers:"); // Prints the membership tiers header
            console.log("1. Silver"); // Prints the Silver tier option
            console.log("2. Gold"); // Prints the Gold tier option
            console.log("3. Platinum"); // Prints the Platinum tier option
            rl.question("Enter membership tier (Silver/Gold/Platinum): ", (membershipInput) => { // Asks for the membership tier
                membershipTier = membershipInput.trim().toLowerCase(); // Removes spaces and converts to lowercase for matching the switch cases
                let totalPrice: number; // Declares the variable that will hold the final price to pay
                let roomPrice: number; // Declares the variable that will hold the room subtotal (price per night x nights)
                switch (roomType) { // Chooses a branch based on the room type entered
                    case 'standard': // Runs if the room type is "standard"
                        roomPrice = standardRoomPrice * numberOfNights; // Room subtotal = Standard price x number of nights
                        switch (membershipTier) { // Chooses a branch based on the membership tier
                        case 'silver': { // Runs if the tier is "silver"
                            if (numberOfNights >= 7) { // Checks if the stay is 7 nights or more (long-stay discount applies)
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsSilver + spaPrice - (roomPrice * sevenNightsDiscount); // Total = room - Silver discount + spa - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" if spa is selected, otherwise "No"
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if 7+ nights and no spa
                                    totalPrice = roomPrice - membershipDiscountsSilver - (roomPrice * sevenNightsDiscount); // Total = room - Silver discount - 5% of room (no spa fee)
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for 7+ nights
                            } else { // Runs if the stay is fewer than 7 nights
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsSilver + spaPrice; // Total = room - Silver discount + spa (no long-stay discount)
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if under 7 nights and no spa
                                    totalPrice = roomPrice -= membershipDiscountsSilver; // Subtracts the Silver discount from roomPrice (modifying it) and assigns that result to totalPrice
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for under 7 nights
                            } // Ends the 7-nights if/else
                        } // Ends the block of case 'silver'
                        break; // Exits the membership switch so execution doesn't fall into the next case
                        case 'gold': { // Runs if the tier is "gold"
                            if (numberOfNights >= 7) { // Checks if the stay is 7 nights or more
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsGold + spaPrice - (roomPrice * sevenNightsDiscount); // Total = room - Gold discount + spa - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if 7+ nights and no spa
                                    totalPrice = roomPrice - membershipDiscountsGold - (roomPrice * sevenNightsDiscount); // Total = room - Gold discount - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for 7+ nights
                            } else { // Runs if the stay is fewer than 7 nights
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsGold + spaPrice; // Total = room - Gold discount + spa
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if under 7 nights and no spa
                                    totalPrice = roomPrice -= membershipDiscountsGold; // Subtracts the Gold discount from roomPrice and assigns the result to totalPrice
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for under 7 nights
                            } // Ends the 7-nights if/else
                        } // Ends the block of case 'gold'
                        break; // Exits the membership switch
                        case 'platinum': { // Runs if the tier is "platinum"
                            if (numberOfNights >= 7) { // Checks if the stay is 7 nights or more
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsPlatinum + spaPrice - (roomPrice * sevenNightsDiscount); // Total = room - Platinum discount + spa - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if 7+ nights and no spa
                                    totalPrice = roomPrice - membershipDiscountsPlatinum - (roomPrice * sevenNightsDiscount); // Total = room - Platinum discount - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for 7+ nights
                            } else { // Runs if the stay is fewer than 7 nights
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsPlatinum + spaPrice; // Total = room - Platinum discount + spa
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if under 7 nights and no spa
                                    totalPrice = roomPrice -= membershipDiscountsPlatinum; // Subtracts the Platinum discount from roomPrice and assigns the result to totalPrice
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for under 7 nights
                            } // Ends the 7-nights if/else
                        } // Ends the block of case 'platinum'
                        break; // Exits the membership switch
                    default: // Runs if the tier is not silver, gold, or platinum
                            console.log("Invalid membership tier."); // Tells the user the membership tier is invalid
                            break; // Exits the membership switch
                        } // Ends the membership switch (inside the 'standard' room case)
                        break; // Exits the room type switch so execution doesn't fall into 'deluxe'
                    case 'deluxe': // Runs if the room type is "deluxe"
                        roomPrice = deluxeRoomPrice * numberOfNights; // Room subtotal = Deluxe price x number of nights
                        switch (membershipTier) { // Chooses a branch based on the membership tier
                        case 'silver': { // Runs if the tier is "silver"
                            if (numberOfNights >= 7) { // Checks if the stay is 7 nights or more
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsSilver + spaPrice - (roomPrice * sevenNightsDiscount); // Total = room - Silver discount + spa - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if 7+ nights and no spa
                                    totalPrice = roomPrice - membershipDiscountsSilver - (roomPrice * sevenNightsDiscount); // Total = room - Silver discount - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for 7+ nights
                            } else { // Runs if the stay is fewer than 7 nights
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsSilver + spaPrice; // Total = room - Silver discount + spa
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if under 7 nights and no spa
                                    totalPrice = roomPrice -= membershipDiscountsSilver; // Subtracts the Silver discount from roomPrice and assigns the result to totalPrice
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for under 7 nights
                            } // Ends the 7-nights if/else
                        } // Ends the block of case 'silver'
                        break; // Exits the membership switch
                        case 'gold': { // Runs if the tier is "gold"
                            if (numberOfNights >= 7) { // Checks if the stay is 7 nights or more
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsGold + spaPrice - (roomPrice * sevenNightsDiscount); // Total = room - Gold discount + spa - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if 7+ nights and no spa
                                    totalPrice = roomPrice - membershipDiscountsGold - (roomPrice * sevenNightsDiscount); // Total = room - Gold discount - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for 7+ nights
                            } else { // Runs if the stay is fewer than 7 nights
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsGold + spaPrice; // Total = room - Gold discount + spa
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if under 7 nights and no spa
                                    totalPrice = roomPrice -= membershipDiscountsGold; // Subtracts the Gold discount from roomPrice and assigns the result to totalPrice
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for under 7 nights
                            } // Ends the 7-nights if/else
                        } // Ends the block of case 'gold'
                        break; // Exits the membership switch
                        case 'platinum': { // Runs if the tier is "platinum"
                            if (numberOfNights >= 7) { // Checks if the stay is 7 nights or more
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsPlatinum + spaPrice - (roomPrice * sevenNightsDiscount); // Total = room - Platinum discount + spa - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if 7+ nights and no spa
                                    totalPrice = roomPrice - membershipDiscountsPlatinum - (roomPrice * sevenNightsDiscount); // Total = room - Platinum discount - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for 7+ nights
                            } else { // Runs if the stay is fewer than 7 nights
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsPlatinum + spaPrice; // Total = room - Platinum discount + spa
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if under 7 nights and no spa
                                    totalPrice = roomPrice -= membershipDiscountsPlatinum; // Subtracts the Platinum discount from roomPrice and assigns the result to totalPrice
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for under 7 nights
                            } // Ends the 7-nights if/else
                        }break; // Ends the block of case 'platinum' and exits the membership switch
                        default: // Runs if the tier is not silver, gold, or platinum
                            console.log("Invalid membership tier."); // Tells the user the membership tier is invalid
                            break; // Exits the membership switch
                    }break; // Ends the membership switch (inside 'deluxe') and exits the room type switch
                        
                    case 'suite': // Runs if the room type is "suite"
                        roomPrice = suiteRoomPrice * numberOfNights; // Room subtotal = Suite price x number of nights
                        switch (membershipTier) { // Chooses a branch based on the membership tier
                        case 'silver': { // Runs if the tier is "silver"
                            if (numberOfNights >= 7) { // Checks if the stay is 7 nights or more
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsSilver + spaPrice - (roomPrice * sevenNightsDiscount); // Total = room - Silver discount + spa - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if 7+ nights and no spa
                                    totalPrice = roomPrice - membershipDiscountsSilver - (roomPrice * sevenNightsDiscount); // Total = room - Silver discount - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for 7+ nights
                            } else { // Runs if the stay is fewer than 7 nights
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsSilver + spaPrice; // Total = room - Silver discount + spa
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if under 7 nights and no spa
                                    totalPrice = roomPrice -= membershipDiscountsSilver; // Subtracts the Silver discount from roomPrice and assigns the result to totalPrice
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for under 7 nights
                            } // Ends the 7-nights if/else
                        } // Ends the block of case 'silver'
                        break; // Exits the membership switch
                        case 'gold': { // Runs if the tier is "gold"
                            if (numberOfNights >= 7) { // Checks if the stay is 7 nights or more
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsGold + spaPrice - (roomPrice * sevenNightsDiscount); // Total = room - Gold discount + spa - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if 7+ nights and no spa
                                    totalPrice = roomPrice - membershipDiscountsGold - (roomPrice * sevenNightsDiscount); // Total = room - Gold discount - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for 7+ nights
                            } else { // Runs if the stay is fewer than 7 nights
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsGold + spaPrice; // Total = room - Gold discount + spa
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if under 7 nights and no spa
                                    totalPrice = roomPrice -= membershipDiscountsGold; // Subtracts the Gold discount from roomPrice and assigns the result to totalPrice
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for under 7 nights
                            } // Ends the 7-nights if/else
                        } // Ends the block of case 'gold'
                        break; // Exits the membership switch
                        case 'platinum': { // Runs if the tier is "platinum"
                            if (numberOfNights >= 7) { // Checks if the stay is 7 nights or more
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsPlatinum + spaPrice - (roomPrice * sevenNightsDiscount); // Total = room - Platinum discount + spa - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if 7+ nights and no spa
                                    totalPrice = roomPrice - membershipDiscountsPlatinum - (roomPrice * sevenNightsDiscount); // Total = room - Platinum discount - 5% of room
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for 7+ nights
                            } else { // Runs if the stay is fewer than 7 nights
                                if (spaSelected) { // Checks if the guest chose spa
                                    totalPrice = roomPrice - membershipDiscountsPlatinum + spaPrice; // Total = room - Platinum discount + spa
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } else { // Runs if under 7 nights and no spa
                                    totalPrice = roomPrice -= membershipDiscountsPlatinum; // Subtracts the Platinum discount from roomPrice and assigns the result to totalPrice
                                    console.log("==RECEIPT=="); // Prints the receipt header
                                    console.log("Room Type: " + roomType); // Prints the room type
                                    console.log("Number of Nights: " + numberOfNights); // Prints the number of nights
                                    console.log("Spa Service: " + (spaSelected ? "Yes" : "No")); // Prints "Yes" or "No" for spa
                                    console.log("Membership Tier: " + membershipTier); // Prints the membership tier
                                    console.log("Total Price: Rp" + totalPrice); // Prints the total price
                                } // Ends the spa if/else for under 7 nights
                            } // Ends the 7-nights if/else
                        }break; // Ends the block of case 'platinum' and exits the membership switch
                        default: // Runs if the tier is not silver, gold, or platinum
                            console.log("Invalid membership tier."); // Tells the user the membership tier is invalid
                            break; // Exits the membership switch
                    }break; // Ends the membership switch (inside 'suite') and exits the room type switch
                        
                    default: // Runs if the room type is not standard, deluxe, or suite
                        console.log("Invalid room type."); // Tells the user the room type is invalid
                        break; // Exits the room type switch
                } // Ends the room type switch
                rl.close(); // Closes the readline interface after the calculation is finished (ends the program)
            }); // Ends the membership tier question callback
        }); // Ends the spa question callback
    }); // Ends the number of nights question callback
}); // Ends the room type question callback