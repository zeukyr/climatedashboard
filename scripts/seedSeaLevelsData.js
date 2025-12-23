import fs from 'fs';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://atxzdfgfusiblgchbfzs.supabase.co';
const supabaseKey = 'sb_publishable_aNHctfcrdDWYSF_oxNKO_g_9HSXfOUK';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedSeaLevelsData() {  
    const csvFile = fs.readFileSync('./data/sealevels.csv', 'utf8');
  
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      comments: '#', 
      complete: async (results) => {
        console.log(`Parsed ${results.data.length} rows`);

        console.log('First row columns:', Object.keys(results.data[0]));
        console.log('First row data:', results.data[0]);

  
        const dataToInsert = results.data
          .filter(row => row.year)
          .map(row => {
            const sea_level = parseFloat(
              row['TOPEX/Poseidon'] ||
              row['Jason-1'] ||
              row['Jason-2'] ||
              row['Jason-3'] ||
              row['Sentinel-6MF']
            );

            const decimal_date = parseFloat(row.year);
            const year = Math.floor(decimal_date);
            const month = Math.round((decimal_date - year) * 12);

            return {
              year: year,
              month: month, 
              decimal_date: decimal_date,
              sea_level_mm: sea_level,
            };
          }).filter(row => !isNaN(row.sea_level_mm));
  
        console.log(`Inserting ${dataToInsert.length} valid records...`);
  
        const batchSize = 1000;
        for (let i = 0; i < dataToInsert.length; i += batchSize) {
          const batch = dataToInsert.slice(i, i + batchSize);
          
          const { error } = await supabase
            .from('sea_level_data')
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
  
  seedSeaLevelsData();