import { For, JSX, Show, createEffect, createSignal } from "solid-js";
import { HardDriveIcon } from "../../../public/icons/hard-drive";
import { LoadingFill } from "../Loading";
import delay from "../../helpers/delay";
import TerminalText, { Legends } from "../TerminalText";
import { FileTextIcon } from "../../../public/icons/file-text";
import Flush, { flushDelay } from "../Flush";
import { ddriveContents } from "./DDrive-contents";
import { Button } from "../Buttons";
import { isRedacted, setRedacted } from "../session/redacted";

type File = {
  name: string;
  date: Date;
  size: string;
  icon: JSX.Element;
  contents?: {
    redacted?: any[];
    cleaned: any[];
  };
};
const files: File[] = [
  {
    name: "CAF-REQUEST",
    date: new Date("1981-05-12"),
    size: "403KB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "ALLOCATIOS",
    date: new Date("1978-09-23"),
    size: "22KB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "GR-KSD-455",
    date: new Date("1980-02-15"),
    size: "122.2MB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "88_B-REPAIRS",
    date: new Date("1977-08-04"),
    size: "710KB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "CASE-REPORT",
    date: new Date("1978-11-11"),
    size: "56KB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "97_1-BDG-55",
    date: new Date("1979-03-28"),
    size: "1.8MB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "MAC-7B_AX",
    date: new Date("1980-06-09"),
    size: "2.1MB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "ANOMALY-REPORT",
    date: new Date("1981-01-31"),
    size: "88KB",
    icon: <FileTextIcon class="text-monitor-400" />,
    contents: ddriveContents.anomally,
  },
  {
    name: "OPERATIONS",
    date: new Date("1977-12-15"),
    size: "972KB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "OPERATIONS-REP",
    date: new Date("1978-04-20"),
    size: "2KB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "HAL-879-APR",
    date: new Date("1979-10-05"),
    size: "645MB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "FLEET-RETURNS-0",
    date: new Date("1981-06-18"),
    size: "1MB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "WATER-PURIFICATION-ASSESMENT",
    date: new Date("1978-07-30"),
    size: "2MB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "FL-UNIT-UST357",
    date: new Date("1980-09-07"),
    size: "18KB",
    icon: <HardDriveIcon class="text-monitor-400 opacity-70" />,
  },
  {
    name: "BYPASS-REDACTION",
    date: new Date("1979-11-22"),
    contents: {
      cleaned: [
        "RUN THIS PROGRAM TO BYPASS REDACTIONS",
        Legends.NewLine,
        Legends.NewLine,
        <Button onClick={() => setRedacted(false)}>
          {"RUN 'BYPASS.BTS'"}
        </Button>,
      ],
    },
    size: "12MB",
    icon: <FileTextIcon class="text-monitor-400" />,
  },
];

const FileItem = (props: {
  roundDownToNearestThird: number;
  onCLick?: () => void;
  item: File;
}) => {
  return (
    <button
      style={{
        "animation-delay": `${props.roundDownToNearestThird * 70}ms`,
      }}
      class="border-2 border-monitor-300 border-glow min-w-64 flex gap-4 px-3 py-2 items-center "
      onClick={props.onCLick}
    >
      <div class="flex justify-center items-center">
        <HardDriveIcon class="text-monitor-400" />
      </div>
      <div class="flex flex-col w-full">
        <div class="flex align-center">
          <p>{props.item.name}</p>
        </div>
        <div class="flex justify-between w-full">
          <p class="text-monitor-400">
            <small>{props.item.date.toLocaleDateString()}</small>
          </p>
          <p>
            <small>{props.item.size}</small>
          </p>
        </div>
      </div>
    </button>
  );
};

export default function DDrive() {
  const [loading, setLoading] = createSignal(true);
  const [selectedFile, setSelectedFile] = createSignal<number>(-1);
  const [flush, setFlush] = createSignal(false);
  // const [removeRedacted, setRemoveRedacted] = createSignal(false);

  const selectedFileHandler = async (file: number) => {
    setFlush(() => true);
    setTimeout(() => {
      setFlush(() => false);
      setSelectedFile(file);
    }, flushDelay);
  };

  setTimeout(() => {
    setLoading(false);
  }, 1200);

  return (
    <>
      <Show when={!flush()} fallback={<Flush />}>
        <Show when={selectedFile() > -1}>
          <div class="flex gap-2 items-center">
            {"<-"}
            <FileItem
              item={files[selectedFile()]}
              roundDownToNearestThird={0}
              onCLick={() => {
                selectedFileHandler(-1);
              }}
            />
          </div>
          <br />
          <TerminalText
            // input={files[selectedFile()]?.contents || []}
            input={
              files[selectedFile()]?.contents &&
              files[selectedFile()].contents?.redacted
                ? isRedacted()
                  ? files[selectedFile()]?.contents?.cleaned
                  : files[selectedFile()]?.contents?.redacted
                : files[selectedFile()].contents?.cleaned
            }
            opts={{ textSize: "small" }}
          />
          {/* <button onClick={() => setRemoveRedacted(true)}>
            remove redaction
          </button> */}
        </Show>
        <Show when={loading()}>
          <LoadingFill />
        </Show>
        <Show when={!loading() && selectedFile() < 0}>
          <div class="flex gap-4 flex-wrap">
            <For each={files}>
              {(file, i) => {
                let roundDownToNearestThird =
                  i() % 3 !== 0 ? i() - (i() % 3) : i();
                return (
                  <>
                    <button
                      style={{
                        "animation-delay": `${roundDownToNearestThird * 50}ms`,
                        transition: "none",
                      }}
                      class="text-left border-2 border-monitor-300 border-glow  flex gap-2 px-3 w-60 py-2 items-center animate-fadeGrowIn opacity-0"
                      onClick={() => selectedFileHandler(i())}
                    >
                      <div class="flex justify-center items-center">
                        {file.icon}
                      </div>
                      <div class="flex flex-col w-full  overflow-hidden">
                        <div class="flex align-center ">
                          <p
                            style={{ "font-size": "0.63rem" }}
                            class="text-ellipsis whitespace-nowrap overflow-hidden"
                          >
                            {file.name}
                          </p>
                        </div>
                        <div class="flex justify-between w-full">
                          <p class="text-monitor-400">
                            <small>{file.date.toLocaleDateString()}</small>
                          </p>
                          <p>
                            <small>{file.size}</small>
                          </p>
                        </div>
                      </div>
                    </button>
                  </>
                );
              }}
            </For>
          </div>
        </Show>
      </Show>
    </>
  );
}
