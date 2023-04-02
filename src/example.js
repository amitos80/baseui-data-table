import React from 'react';
import {useStyletron} from 'baseui';
import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  CustomColumn,
  NumericalColumn,
  StringColumn,
  COLUMNS,
  NUMERICAL_FORMATS,
} from 'baseui/data-table';
import { faker } from '@faker-js/faker'
import { sample } from 'lodash';

// https://gist.github.com/6174/6062387

const sampleData = [
  {"nctId":{"type":"text","value":"NCT05706935"},"enrollment":200,"link":{"type":"link","value":"https://ClinicalTrials.gov/show/NCT05706935"},"locations":"University of Wisconsin, Madison, Wisconsin, United States","status":{"type":"text","value":"Recruiting (No Results Available)"},"minAge":"18 Years","maxAge":null,"outcomeMeasures":"MeMed BV® test result and diagnostic concordance","lastUpdatePosted":"2023-02-28T00:00:00","title":{"type":"running-text","value":"MeMed BV® Test Evaluation in Adult Emergency Department Patients"}},
  {"nctId":{"type":"text","value":"NCT05762302"},"enrollment":1316,"link":{"type":"link","value":"https://ClinicalTrials.gov/show/NCT05762302"},"locations":"Maimonides Medical Center, Brooklyn, New York, United States\nCarmel Medical Center, Haifa, Israel\nSourasky Medical Center - Ichilov, Tel Aviv, Israel","status":{"type":"text","value":"Not yet recruiting (No Results Available)"},"minAge":"18 Years","maxAge":"99 Years","outcomeMeasures":"To demonstrate MeMed BV® added value on top of standard of care in lowering unwarranted antibiotic prescribing in patients with LRTI in the ED/UCC.","lastUpdatePosted":"2023-03-09T00:00:00","title":{"type":"running-text","value":"The Impact of MeMed BV® on Management of Patients With Suspected Lower Respiratory Tract Infections (LRTI) in the Emergency Department (ED) and Urgent Care Center (UCC) (\"JUPITER\" TRIAL)"}},
  {"nctId":{"type":"text","value":"NCT04690569"},"enrollment":1384,"link":{"type":"link","value":"https://ClinicalTrials.gov/show/NCT04690569"},"locations":"Johns Hopkins, Baltimore, Maryland, United States\nBoston Children's Hospital, Boston, Massachusetts, United States\nMaimonides Medical Center, New York, New York, United States\nUniversity of Pittsburgh Medical Center, Pittsburgh, Pennsylvania, United States\nAmerican Family Care Urgent Care, Easley, South Carolina, United States\nAmerican Family Care Urgent Care, Powdersville, South Carolina, United States\nAmerican Family Care Urgent Care, Chattanooga, Tennessee, United States\nTexas Children's Hospital, Houston, Texas, United States\nUniversity of Texas Health Science Center, Houston, Texas, United States\nHillel Yaffe Medical Center, Hadera, Israel\nCarmel Medical Center, Haifa, Israel","status":{"type":"text","value":"Completed (No Results Available)"},"minAge":"90 Days","maxAge":null,"outcomeMeasures":"Establish the diagnostic performance of the MeMed BV™ Test for differentiating bacterial from viral infection using expert adjudication comparator method.","lastUpdatePosted":"2021-01-05T00:00:00","title":{"type":"running-text","value":"Establish MeMed BV™ Performance for Differentiating Bacterial From Viral Infection in Suspected Acute Infection Patients (APOLLO STUDY)"}},
  {"nctId":{"type":"text","value":"NCT05439551"},"enrollment":215,"link":{"type":"link","value":"https://ClinicalTrials.gov/show/NCT05439551"},"locations":"Maimonides Medical Center, Brooklyn, New York, United States\nUrgent Care Clinical Trials @ AFC Urgent Care- Easley, Easley, South Carolina, United States\nHillel Yaffe Medical Center, Hadera, Israel\nCarmel Medical Center, Haifa, Israel\nSourasky Medical Center - Ichilov, Tel Aviv, Israel","status":{"type":"text","value":"Suspended (No Results Available)"},"minAge":"90 Days","maxAge":null,"outcomeMeasures":"Measuring the MeMed BV® score with whole blood and serum samples from patients suspected of acute bacterial or viral infection and demonstrating the equivalence between the two matrices.","lastUpdatePosted":"2023-02-15T00:00:00","title":{"type":"running-text","value":"Evaluating the Analytical Equivalency of Serum and Whole Blood Samples Run on the MeMed Key® Platform (Perseverance Study)"}},
  {"nctId":{"type":"text","value":"NCT04709978"},"enrollment":150,"link":{"type":"link","value":"https://ClinicalTrials.gov/show/NCT04709978"},"locations":"University of Wisconsin, Madison, Wisconsin, United States","status":{"type":"text","value":"Active, not recruiting (No Results Available)"},"minAge":"60 Years","maxAge":null,"outcomeMeasures":"Number of Participants with Aspiration\nSalivary extensional viscosity\nSalivary Substance P Concentration\nSalivary pH\nRecurrent pneumonia\nLung Ultrasound Findings for ED participants\nPatient Reported Swallowing Function as measured by physical symptoms on SWAL-QOL\nPercent Viral vs. Bacterial Infection for ED participants\nRespiratory Pressure\nPeak Expiratory Flow (PEF)\nForced Expiratory Volume (FEV1)","lastUpdatePosted":"2023-02-01T00:00:00","title":{"type":"running-text","value":"Community Acquired Pneumonia in Older Adults"}},

].map((row) => {
  return {
    ...row,
    date: {"type":"date","value": faker.date.between('2015-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z')},
    test1: {"type":"text","value":"abcdefgh ijk"},
    test2: {"type":"text","value":"abcdefgh ijklmnopqrstuvwxyz"},
    test3: {"type":"text","value":"abc de"},
    test4: {"type":"text","value":"click me "},
    test5:  {"type":"text","value":"text texttext text text text text text text texttext texttext text "},
  }
})

function makeRowsFromColumns(columns, rowCount) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    const row = sample(sampleData);
    rows.push({
      id: i,
      data: columns.map((column, j) => {
        console.log([column, ' column => '].reverse());
        switch (column.title) {
          case 'NCT Id':
            return row.nctId.value;
          case 'Date':
            return row.date.value;
          case 'Link':
            return row.link.value;
          case 'Title':
            return row.title.value;
          case 'Status':
            return row.status.value;
          case 'Test1':
            return row.test1.value;
          default:
            return 'default';
        }
      }),
    });
  }
  return rows;
}


const columns = [
  StringColumn({
    title: 'Date',
    sortable: true,
    kind: COLUMNS.DATETIME,


    mapDataToValue: (data) => data[0].toLocaleDateString(),
  }),
  StringColumn({
    title: 'NCT Id',
    kind: COLUMNS.STRING,

    mapDataToValue: (data) => data[1],
  }),
  StringColumn({
    title: 'Link',
    kind: COLUMNS.STRING,


    mapDataToValue: (data) => data[2],
  }),
  StringColumn({
    title: 'Title',
    //highlight: n => n < 0,
    kind: COLUMNS.STRING,


    mapDataToValue: (data) => data[3],
  }),
  StringColumn({
    title: 'Status',
    kind: COLUMNS.STRING,


    mapDataToValue: (data) => data[4],
  }),
  StringColumn({
    kind: COLUMNS.STRING,
    title: 'Test1',


    mapDataToValue: (data) => data[5],
    // renderCell: function Cell(props) {
    //   const [css] = useStyletron();
    //   return (
    //     <div
    //       className={css({
    //         alignItems: 'center',
    //         fontFamily: '"Comic Sans MS", cursive, sans-serif',
    //         display: 'flex',
    //       })}
    //     >
    //
    //       {props.value}
    //     </div>
    //   );
    // },
  }),
  // BooleanColumn({
  //   title: 'boolean',
  //   mapDataToValue: (data) => data[6],
  // }),
  // CategoricalColumn({
  //   title: 'second category',
  //   mapDataToValue: (data) => data[7],
  // }),
];

const rows = makeRowsFromColumns(columns, 200);

export default function Example() {
  const [css] = useStyletron();
  console.log([rows, ' rows => '].reverse());
  return (
    <div className={css({height: '800px'})}>
      <StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
}