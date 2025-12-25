import fs from 'fs';
import Papa from 'papaparse';
import { createClient } from "@supabase/supabase-js";

import dotenv from 'dotenv';
dotenv.config(); 

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


async function seedZonalTemperatureData() {
    const csvFile = fs.readFileSync('./data/zonal_temperature.csv', 'utf8');
    Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true,
        comments: '#', 
        complete: async (results) => {
          console.log(`Parsed ${results.data.length} rows`); 
          const regions = [
            { key: '64N-90N', name: 'Arctic', lat_min: 64, lat_max: 90 },
            { key: '44N-64N', name: 'Northern High', lat_min: 44, lat_max: 64 },
            { key: '24N-44N', name: 'Northern Mid', lat_min: 24, lat_max: 44 },
            { key: 'EQU-24N', name: 'Northern Tropics', lat_min: 0, lat_max: 24 },
            { key: '24S-EQU', name: 'Southern Tropics', lat_min: -24, lat_max: 0 },
            { key: '44S-24S', name: 'Southern Mid', lat_min: -44, lat_max: -24 },
            { key: '64S-44S', name: 'Southern High', lat_min: -64, lat_max: -44 },
            { key: '90S-64S', name: 'Antarctic', lat_min: -90, lat_max: -64 },
          ];
    
          const dataToInsert = []
          results.data.forEach(row => {
              const year = parseInt(row.Year);
              if (isNaN(year)) return;
              
              regions.forEach(region => {
                const temp = row[region.key]
                dataToInsert.push({
                    year: parseInt(row.Year),
                    temperature_anomaly: temp,
                    region: region.name,
                    lat_min: region.lat_min,
                    lat_max: region.lat_max,      
                })
              })
            });
            console.log(`Inserting ${dataToInsert.length} valid records...`);
            const batchSize = 1000;
            for (let i = 0; i < dataToInsert.length; i += batchSize) {
            const batch = dataToInsert.slice(i, i + batchSize);
            
            const { error } = await supabase
                .from('regional_temperature_data')
                .insert(batch);

            if (error) {
                console.error('Error inserting batch:', error);
            } else {
                console.log(`Inserted batch ${i / batchSize + 1}`);
            }
            }
  }})
          
        }

seedZonalTemperatureData()