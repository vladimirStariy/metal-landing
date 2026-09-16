import type { Metadata } from "next";
import GroupPage from "../components/GroupPage";
import { groupMeta } from "../content/pages";

export const metadata: Metadata = {
  title: groupMeta.izdeliya.title,
  description: groupMeta.izdeliya.description,
  alternates: { canonical: "/izdeliya" },
};

export default function Page() {
  return <GroupPage group="izdeliya" />;
}
