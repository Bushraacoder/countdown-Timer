import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

async function main() {
  const res = await inquirer.prompt({
    name: "UserInput",
    type: "input",
    message: "Please enter the amount of seconds.",
    validate: (input: string) => {
      const parsed = parseInt(input, 10);
      if (isNaN(parsed)) {
        return "Please enter a valid number!";
      } else if (parsed > 60) {
        return "Seconds must be in 60!";
      } else if (parsed <= 0) {
        return "Please enter a positive number!";
      } else {
        return true;
      }
    },
    
  });

  // Convert the input to a number
  const input = parseInt(res.UserInput, 10);
  startTime(input);
}

function startTime(val: number) {
  const intTime = new Date().setSeconds(new Date().getSeconds() + val);
  const intervalTime = new Date(intTime);
  setInterval(() => {
    const currTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, currTime);
    if (timeDiff <= 0) {
      console.log("Timer has expired!");
      process.exit();
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDiff % 60);
    console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
  }, 1000);
}

main();
