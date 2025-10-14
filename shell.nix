with import <nixpkgs> {};
mkShell {
  nativeBuildInputs = [
 nodePackages.nodejs
  ];
}
