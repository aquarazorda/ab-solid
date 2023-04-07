export type BranchAddress = {
  id: number;
  addressType: string;
  byTags: {
    city: number;
    alwaysOpen: boolean;
  };
  location: {
    lat: number;
    lng: number;
  };
  company_id: number;
  fromHour: string;
  toHour: string;
};

export const cityList = [
  {
    value: "1",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_1",
    },
  },
  {
    value: "2",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_2",
    },
  },
  {
    value: "3",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_3",
    },
  },
  {
    value: "5",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_5",
    },
  },
  {
    value: "6",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_6",
    },
  },
  {
    value: "7",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_7",
    },
  },
  {
    value: "8",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_8",
    },
  },
  {
    value: "9",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_9",
    },
  },
  {
    value: "10",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_10",
    },
  },
  {
    value: "11",
    disabled: false,
    title: {
      lang: true,
      langId: "_branch_citie_11",
    },
  },
];
