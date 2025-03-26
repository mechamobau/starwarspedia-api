import express from 'express';
import axios from 'axios';
import { redisClient } from '../utils/redis';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

const getSwapiData = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { resource, id } = req.params;
  const queryString = req.originalUrl.split('?')[1] || '';
  let cacheKey = `${resource}`;
  if (id) {
    cacheKey += `:${id}`;
  }
  if (queryString) {
    cacheKey += `:${queryString}`;
  }

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      res.json(JSON.parse(cachedData));
      return;
    }

    let url = `${SWAPI_BASE_URL}/${resource}`;

    if (id) {
      url += `/${id}`;
    }

    if (queryString) {
      url += `?${queryString}`;
    }

    const response = await axios.get(url);
    await redisClient.set(cacheKey, JSON.stringify(response.data), {
      EX: 3600,
    });

    res.json(response.data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: 'Failed to fetch data from SWAPI' });
  }
};

export { getSwapiData };
