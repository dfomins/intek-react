function Footer() {
  return (
    <footer className="w-full flex justify-center py-10 bg-system-green text-white">
      <div className="max-w-[1200px] flex">
        <div className="w-auto">
          <h3 className="mb-3 font-semibold">Par mums</h3>
          <p>Intek - moderns portāls, lai jūs varētu veidot darba atskaites savā uzņēmumā. Viegla atskaišu sistēma ļaus atzīmēt stundu skaitu katram darbiniekam pāris minūšu garumā.</p>
        </div>
        <div className="w-auto">
          <h3 className="mb-3 font-semibold">Kontakti</h3>
          <p>+371 12345678</p>
          <p>info@intek.lv</p>
          <p>Jelgava, Lielā iela 2</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
