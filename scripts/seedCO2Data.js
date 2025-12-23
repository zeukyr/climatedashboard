import fs from 'fs';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://atxzdfgfusiblgchbfzs.supabase.co';
const supabaseKey = 'sb_publishable_aNHctfcrdDWYSF_oxNKO_g_9HSXfOUK';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedCO2Data() {  
    const csvFile = fs.readFileSync('./data/co2_monthly.csv', 'utf8');
  
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      comments: '#', 
      complete: async (results) => {
        console.log(`Parsed ${results.data.length} rows`);

        console.log('First row columns:', Object.keys(results.data[0]));
        console.log('First row data:', results.data[0]);

  
        const dataToInsert = results.data
          .filter(row => row.average && row.average !== '-99.99')
          .map(row => ({
            year: parseInt(row.year),
            month: parseInt(row.month),
            decimal_date: parseFloat(row['decimal date']),
            co2_ppm: parseFloat(row.average),
          }));
  
        console.log(`Inserting ${dataToInsert.length} valid records...`);
  
        const batchSize = 1000;
        for (let i = 0; i < dataToInsert.length; i += batchSize) {
          const batch = dataToInsert.slice(i, i + batchSize);
          
          const { error } = await supabase
            .from('co2_data')
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
  
  seedCO2Data();