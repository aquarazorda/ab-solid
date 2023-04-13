import { useNavigate, useParams } from "solid-start";

export default function CasinoMainMobile() {
  const params = useParams();
  const navigate = useNavigate();

  if (!params.category) {
    navigate("./Top");
  }
}
