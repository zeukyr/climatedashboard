import fs from 'fs';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://atxzdfgfusiblgchbfzs.supabase.co';
const supabaseKey = 'sb_publishable_aNHctfcrdDWYSF_oxNKO_g_9HSXfOUK';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedTemperatureData() {  
    const csvFile = fs.readFileSync('./data/surfacetemperature.csv', 'utf8');
    const lines = csvFile.split('\n')
    const newCsvFile = lines.slice(1).join('\n')
  
    Papa.parse(newCsvFile, {
      header: true,
      skipEmptyLines: true,
      comments: '#', 
      complete: async (results) => {
        console.log(`Parsed ${results.data.length} rows`);

        console.log('First row columns:', Object.keys(results.data[0]));
        console.log('First row data:', results.data[1]);

  
        const dataToInsert = results.data
          .map(row => ({
              year: parseInt(row.Year),
              temperature_anomaly: Number(row['J-D']),
              region: 'global',
            })).filter(row => row.year && !isNaN(row.temperature_anomaly))

  
        console.log(`Inserting ${dataToInsert.length} valid records...`);
  
        const batchSize = 1000;
        for (let i = 0; i < dataToInsert.length; i += batchSize) {
          const batch = dataToInsert.slice(i, i + batchSize);
          
          const { error } = await supabase
            .from('temperature_data')
            .insert(batch);
  
          if (error) {
            console.error('Error inserting batch:', error);
          } else {
            console.log(`Inserted batch ${i / batchSize + 1}`);
          }
        }
  
      },
    });
  }
  
  seedTemperatureData();