import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span>😕</span>
      <br />
      <h1>Ничего не найдено:(</h1>
      <p className={styles.description}>
        К сожалени данная страница отсутствует в нашем интернет-магазине
      </p>
    </h1>
  );
};
