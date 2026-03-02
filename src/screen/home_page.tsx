import Select from "../components/input/select";
import Breadcrumb from "../components/navigation/breadcrumbs";
import { useLoaderData } from "react-router-dom";
import { useLocalStorage } from "../hook/useLocalStorage";

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-3.5 w-3.5 text-emerald-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

type LocationLevel = {
  label: string;
  value: string | undefined;
  color: string;
  bg: string;
  dot: string;
};

type BaseLocation = {
  id: number;
  name: string;
};

type Regency = BaseLocation & {
  province_id: number;
};

type District = BaseLocation & {
  regency_id: number;
};

export type LoaderData = {
  provinces: BaseLocation[];
  regencies: Regency[];
  districts: District[];
};

export default function HomePage() {
  const data: LoaderData = useLoaderData();

  const [selectedProvince, setSelectedProvince, removeProvince] =
    useLocalStorage<number | null>("province", null);

  const [selectedRegency, setSelectedRegency, removeRegency] = useLocalStorage<
    number | null
  >("regency", null);

  const [selectedDistrict, setSelectedDistrict, removeDistrict] =
    useLocalStorage<number | null>("district", null);

  const filteredRegencies = data.regencies.filter(
    (r) => r.province_id === selectedProvince,
  );
  const filteredDistricts = data.districts.filter(
    (d) => d.regency_id === selectedRegency,
  );

  const selectedProvinceName = data.provinces.find(
    (p) => p.id === selectedProvince,
  )?.name;
  const selectedRegencyName = data.regencies.find(
    (r) => r.id === selectedRegency,
  )?.name;
  const selectedDistrictName = data.districts.find(
    (d) => d.id === selectedDistrict,
  )?.name;

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(Number(e.target.value));
    setSelectedRegency(null);
    setSelectedDistrict(null);
  };

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegency(Number(e.target.value));
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(Number(e.target.value));
  };

  const breadcrumbItems = [
    { path: "Indonesia", href: "/" },
    ...(selectedProvinceName ? [{ path: selectedProvinceName }] : []),
    ...(selectedRegencyName ? [{ path: selectedRegencyName }] : []),
    ...(selectedDistrictName ? [{ path: selectedDistrictName }] : []),
  ];

  const locationLevels: LocationLevel[] = [
    {
      label: "Provinsi",
      value: selectedProvinceName,
      color: "text-emerald-700",
      bg: "bg-emerald-50 border-emerald-200",
      dot: "bg-emerald-500",
    },
    {
      label: "Kota / Kabupaten",
      value: selectedRegencyName,
      color: "text-teal-700",
      bg: "bg-teal-50 border-teal-200",
      dot: "bg-teal-500",
    },
    {
      label: "Kecamatan",
      value: selectedDistrictName,
      color: "text-cyan-700",
      bg: "bg-cyan-50 border-cyan-200",
      dot: "bg-cyan-500",
    },
  ];

  const filledCount = [
    selectedProvinceName,
    selectedRegencyName,
    selectedDistrictName,
  ].filter(Boolean).length;

  const handleResetFilter = () => {
    const isConfirmed = confirm("Yakin ingin reset filter?");

    if (!isConfirmed) return;

    removeProvince();
    removeRegency();
    removeDistrict();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40 p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Frontend Assessment
        </h1>
      </div>

      <div className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-100 md:w-80 md:flex-none">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">
              Filter Lokasi
            </h2>
            {filledCount > 0 && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                {filledCount}/3 dipilih
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500 ease-out"
                style={{ width: `${(filledCount / 3) * 100}%` }}
              />
            </div>

            <Select
              id="province"
              name="province"
              label="Provinsi"
              options={data.provinces.map((r) => ({
                value: r.id,
                label: r.name,
              }))}
              value={selectedProvince ?? ""}
              onChange={handleProvinceChange}
            />

            <Select
              id="regency"
              name="regency"
              label="Kota / Kabupaten"
              disabled={!selectedProvince}
              options={filteredRegencies.map((r) => ({
                value: r.id,
                label: r.name,
              }))}
              value={selectedRegency ?? ""}
              onChange={handleRegencyChange}
            />

            <Select
              id="district"
              name="district"
              label="Kecamatan"
              disabled={!selectedRegency}
              options={filteredDistricts.map((d) => ({
                value: d.id,
                label: d.name,
              }))}
              value={selectedDistrict ?? ""}
              onChange={handleDistrictChange}
            />

            <button
              className="font-semibold text-gray-500 cursor-pointer hover:underline"
              type="button"
              onClick={handleResetFilter}
            >
              Reset filter
            </button>
          </div>
        </div>

        <div className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-100">
          <h2 className="mb-5 text-sm font-semibold text-slate-700">
            Hasil Pilihan
          </h2>

          {filledCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
                <MapPinIcon className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-400">
                Belum ada wilayah dipilih
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Mulai dengan memilih provinsi di sebelah kiri
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {locationLevels.map((level, i) => {
                if (!level.value) return null;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-300 ${level.bg}`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${level.dot}`}
                      />
                      {i < filledCount - 1 && (
                        <div className="h-full w-px bg-slate-200" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-400">
                        {level.label}
                      </p>
                      <p
                        className={`mt-0.5 text-sm font-semibold ${level.color}`}
                      >
                        {level.value}
                      </p>
                    </div>

                    {i < filledCount - 1 && (
                      <div className="self-start pt-0.5">
                        <ChevronRight />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
