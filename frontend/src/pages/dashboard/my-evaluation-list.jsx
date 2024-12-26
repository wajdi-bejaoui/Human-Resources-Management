import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getMyEvaluations } from "../../api/evaluationApi";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Rating,
  Spinner
} from "@material-tailwind/react";

// You can dynamically generate or customize this list
const years = [2025, 2024, 2023, 2022, 2021];
const periods = ['Q1', 'Q2', 'Q3', 'Q4', 'Full Year'];

const MyEvaluationsList = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getMyEvaluations({
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setEvaluations(response);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setEvaluations([]);
        setError("Failed to fetch evaluations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

  // Function to render table rows dynamically based on data
  const renderTableRows = (evaluationsForYear) => {
    return evaluationsForYear.map(({ id, evaluationDate, periodRated, year, rate }, key) => {
      const className = `py-3 px-5 ${key === evaluationsForYear.length - 1 ? "" : "border-b border-blue-gray-50"}`;

      return (
        <tr key={id}>
          <td className={className}>
            <Typography className="text-lg font-semibold text-blue-gray-600">{evaluationDate}</Typography>
          </td>
          <td className={className}>
            <Typography className="text-lg font-normal text-blue-gray-500">{periodRated}</Typography>
          </td>
          <td className={className}>
            <Typography className="text-lg font-semibold text-blue-gray-600">{year}</Typography>
          </td>
          <td className={className}>
            <Rating value={rate} readonly />
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="mt-8 mb-8 flex flex-col gap-12">
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : error ? (
        <Typography variant="h6" className="text-center text-red-500">{error}</Typography>
      ) : (
        years.map((year) => {
          const evaluationsForYear = evaluations.filter(
            (evaluation) => parseInt(evaluation.year) === year
          );

          return (
            <Card key={year}>
              <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h5" color="white">
                  Evaluations for {year}
                </Typography>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                {evaluationsForYear.length > 0 ? (
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        {["Evaluation date", "Period rated", "Year Rated", "Rating"].map((el) => (
                          <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                            <Typography variant="small" className="text-[13px] font-bold uppercase text-blue-gray-400">
                              {el}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>{renderTableRows(evaluationsForYear)}</tbody>
                  </table>
                ) : (
                  <Typography variant="h6" className="text-center text-gray-500">
                    No evaluations for {year}
                  </Typography>
                )}
              </CardBody>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default MyEvaluationsList;
