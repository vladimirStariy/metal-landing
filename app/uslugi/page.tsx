import type { Metadata } from "next";
import GroupPage from "../components/GroupPage";
import { groupMeta } from "../content/pages";

export const metadata: Metadata = {
  title: groupMeta.uslugi.title,
  description: groupMeta.uslugi.description,
  alternates: { canonical: "/uslugi" },
};

export default function Page() {
  return <GroupPage group="uslugi" />;
}
