import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { usersEntries } from "../atoms/adminAtom";
import { useRecoilState } from "recoil";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { CheckCircleIcon as CheckCircleIcon2 } from "@heroicons/react/outline";
import Moment from "react-moment";

export default function Entries() {
  const [expanded, setExpanded] = React.useState(false);
  const [entries, setEntries] = useRecoilState(usersEntries);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {entries?.map((entry, i) => (
        <Accordion
          key={i}
          className="my-2"
          expanded={expanded === `panel${i + 1}`}
          onChange={handleChange(`panel${i + 1}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i + 1}bh-content`}
            id={`panel${i + 1}bh-header`}
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {entry?.name}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                ["@media (max-width:640px)"]: {
                  visibility: "hidden",
                },
              }}
            >
              {entry?.email}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {entry?.tasks?.map((task, j) => (
              <div
                key={j}
                className="flex items-center justify-between my-2 w-full py-2 space-x-4 rounded-lg bg-slate-100"
              >
                <div className="flex items-center space-x-4 ">
                  <div className="pl-2 ">
                    {task.isCompleted ? (
                      <CheckCircleIcon className="w-6" />
                    ) : (
                      <CheckCircleIcon2 className="w-6" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span
                      className={`break-all flex text-base sm:text-lg  ${
                        task.isCompleted && "line-through"
                      }`}
                    >
                      {task.text}
                    </span>
                    {!task.isCompleted && (
                      <Moment className="text-sm" fromNow>
                        {task.dueDate}
                      </Moment>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
