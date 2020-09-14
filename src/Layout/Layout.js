/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';

import { BankContext } from '../context/Context';
import LayoutSidebar from './LayoutSidebar';
import LayoutSidebarGuest from './LayoutSidebarGuest';
import LayoutSidebarCoins from './LayoutSidebarCoins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import LoginWrapper from '../components/LoginModal/LoginWrapper';
import IceMechineFooter from '../components/Portfolio/PortfolioDashboard/IceMechineFooter';

function Layout({ children, active, className }) {
  const {
    email,
    openDefaultCoinSidebar,
    footerShow,
    setFooterShow,
  } = useContext(BankContext);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <div className="d-flex transaction-layout">
        {openDefaultCoinSidebar ? (
          <LayoutSidebarCoins active={active} />
        ) : email ? (
          <LayoutSidebar active={active} />
        ) : (
          <LayoutSidebarGuest active={active} />
        )}
        <div className="d-flex flex-column flex-grow-1">
          <div className={`page-content ${className}`}>{children}</div>
          {active === 'portfolio' ? '' : <IceMechineFooter />}
          {!email && footerShow ? (
            <footer
              className="footer-main"
              onClick={() => {
                setLoginModalOpen(true);
              }}
            >
              <svg
                viewBox="0 0 1031 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M455.875 6.9534L474.315 0.201526C474.789 0.0271651 475.297 -0.0353108 475.799 0.0190104C476.302 0.0733315 476.785 0.24297 477.21 0.514585C477.635 0.786205 477.992 1.1524 478.251 1.58437C478.51 2.01635 478.665 2.50233 478.704 3.00411L483.497 64.189L496.466 59.0845L491.332 4.13838L557.074 30.8519L561.299 53.376L539.589 64.789L536.574 42.5631L522.094 36.5564L526.599 66.648C526.779 67.848 526.569 69.074 525.999 70.147C525.429 71.22 524.534 72.084 523.434 72.613L487.413 90L458.61 77.9535C457.573 77.519 456.681 76.8005 456.037 75.8805C455.394 74.961 455.027 73.878 454.977 72.758L452.305 12.3184C452.251 11.1624 452.567 10.0192 453.209 9.0546C453.851 8.08995 454.785 7.354 455.875 6.9534Z"
                  fill="white"
                />
                <path
                  d="M624.2 66.0003H591.7L585.5 81.0003H568.9L600.1 11.0003H616.1L647.4 81.0003H630.4L624.2 66.0003ZM619.1 53.7003L608 26.9003L596.9 53.7003H619.1ZM671.175 81.8003C666.71 81.8003 662.34 81.2668 658.075 80.2003C653.81 79.0668 650.41 77.6668 647.875 76.0003L653.075 64.8003C655.475 66.3338 658.375 67.6003 661.775 68.6003C665.175 69.5338 668.51 70.0003 671.775 70.0003C678.375 70.0003 681.675 68.3668 681.675 65.1003C681.675 63.5668 680.775 62.4668 678.975 61.8003C677.175 61.1338 674.41 60.5668 670.675 60.1003C666.275 59.4338 662.64 58.6668 659.775 57.8003C656.91 56.9338 654.41 55.4003 652.275 53.2003C650.21 51.0003 649.175 47.8669 649.175 43.8003C649.175 40.4003 650.14 37.4003 652.075 34.8003C654.075 32.1336 656.94 30.0669 660.675 28.6003C664.475 27.1336 668.94 26.4003 674.075 26.4003C677.875 26.4003 681.64 26.8336 685.375 27.7003C689.175 28.5003 692.31 29.6336 694.775 31.1003L689.575 42.2003C684.84 39.5336 679.675 38.2003 674.075 38.2003C670.74 38.2003 668.24 38.6669 666.575 39.6003C664.91 40.5336 664.075 41.7336 664.075 43.2003C664.075 44.8669 664.975 46.0336 666.775 46.7003C668.575 47.3669 671.44 48.0003 675.375 48.6003C679.775 49.3336 683.375 50.1338 686.175 51.0003C688.975 51.8003 691.41 53.3003 693.475 55.5003C695.54 57.7003 696.575 60.7668 696.575 64.7003C696.575 68.0338 695.575 71.0003 693.575 73.6003C691.575 76.2003 688.64 78.2338 684.775 79.7003C680.975 81.1003 676.44 81.8003 671.175 81.8003ZM724.3 81.8003C719.835 81.8003 715.465 81.2668 711.2 80.2003C706.935 79.0668 703.535 77.6668 701 76.0003L706.2 64.8003C708.6 66.3338 711.5 67.6003 714.9 68.6003C718.3 69.5338 721.635 70.0003 724.9 70.0003C731.5 70.0003 734.8 68.3668 734.8 65.1003C734.8 63.5668 733.9 62.4668 732.1 61.8003C730.3 61.1338 727.535 60.5668 723.8 60.1003C719.4 59.4338 715.765 58.6668 712.9 57.8003C710.035 56.9338 707.535 55.4003 705.4 53.2003C703.335 51.0003 702.3 47.8669 702.3 43.8003C702.3 40.4003 703.265 37.4003 705.2 34.8003C707.2 32.1336 710.065 30.0669 713.8 28.6003C717.6 27.1336 722.065 26.4003 727.2 26.4003C731 26.4003 734.765 26.8336 738.5 27.7003C742.3 28.5003 745.435 29.6336 747.9 31.1003L742.7 42.2003C737.965 39.5336 732.8 38.2003 727.2 38.2003C723.865 38.2003 721.365 38.6669 719.7 39.6003C718.035 40.5336 717.2 41.7336 717.2 43.2003C717.2 44.8669 718.1 46.0336 719.9 46.7003C721.7 47.3669 724.565 48.0003 728.5 48.6003C732.9 49.3336 736.5 50.1338 739.3 51.0003C742.1 51.8003 744.535 53.3003 746.6 55.5003C748.665 57.7003 749.7 60.7668 749.7 64.7003C749.7 68.0338 748.7 71.0003 746.7 73.6003C744.7 76.2003 741.765 78.2338 737.9 79.7003C734.1 81.1003 729.565 81.8003 724.3 81.8003ZM812.025 54.3003C812.025 54.5003 811.925 55.9003 811.725 58.5003H771.025C771.76 61.8338 773.49 64.4668 776.225 66.4003C778.96 68.3338 782.36 69.3003 786.425 69.3003C789.225 69.3003 791.69 68.9003 793.825 68.1003C796.025 67.2338 798.06 65.9003 799.925 64.1003L808.225 73.1003C803.16 78.9003 795.76 81.8003 786.025 81.8003C779.96 81.8003 774.59 80.6338 769.925 78.3003C765.26 75.9003 761.66 72.6003 759.125 68.4003C756.59 64.2003 755.325 59.4338 755.325 54.1003C755.325 48.8336 756.56 44.1003 759.025 39.9003C761.56 35.6336 764.99 32.3336 769.325 30.0003C773.725 27.6003 778.625 26.4003 784.025 26.4003C789.29 26.4003 794.06 27.5336 798.325 29.8003C802.59 32.0669 805.925 35.3336 808.325 39.6003C810.79 43.8003 812.025 48.7003 812.025 54.3003ZM784.125 38.2003C780.59 38.2003 777.625 39.2003 775.225 41.2003C772.825 43.2003 771.36 45.9336 770.825 49.4003H797.325C796.79 46.0003 795.325 43.3003 792.925 41.3003C790.525 39.2336 787.59 38.2003 784.125 38.2003ZM857.11 78.4003C855.575 79.5338 853.675 80.4003 851.41 81.0003C849.21 81.5338 846.875 81.8003 844.41 81.8003C838.01 81.8003 833.045 80.1668 829.51 76.9003C826.045 73.6338 824.31 68.8338 824.31 62.5003V40.4003H816.01V28.4003H824.31V15.3003H839.91V28.4003H853.31V40.4003H839.91V62.3003C839.91 64.5668 840.475 66.3338 841.61 67.6003C842.81 68.8003 844.475 69.4003 846.61 69.4003C849.075 69.4003 851.175 68.7338 852.91 67.4003L857.11 78.4003ZM883.965 81.8003C879.5 81.8003 875.135 81.2668 870.865 80.2003C866.6 79.0668 863.2 77.6668 860.665 76.0003L865.865 64.8003C868.265 66.3338 871.165 67.6003 874.565 68.6003C877.965 69.5338 881.3 70.0003 884.565 70.0003C891.165 70.0003 894.465 68.3668 894.465 65.1003C894.465 63.5668 893.565 62.4668 891.765 61.8003C889.965 61.1338 887.2 60.5668 883.465 60.1003C879.065 59.4338 875.435 58.6668 872.565 57.8003C869.7 56.9338 867.2 55.4003 865.065 53.2003C863 51.0003 861.965 47.8669 861.965 43.8003C861.965 40.4003 862.935 37.4003 864.865 34.8003C866.865 32.1336 869.735 30.0669 873.465 28.6003C877.265 27.1336 881.735 26.4003 886.865 26.4003C890.665 26.4003 894.435 26.8336 898.165 27.7003C901.965 28.5003 905.1 29.6336 907.565 31.1003L902.365 42.2003C897.635 39.5336 892.465 38.2003 886.865 38.2003C883.535 38.2003 881.035 38.6669 879.365 39.6003C877.7 40.5336 876.865 41.7336 876.865 43.2003C876.865 44.8669 877.765 46.0336 879.565 46.7003C881.365 47.3669 884.235 48.0003 888.165 48.6003C892.565 49.3336 896.165 50.1338 898.965 51.0003C901.765 51.8003 904.2 53.3003 906.265 55.5003C908.335 57.7003 909.365 60.7668 909.365 64.7003C909.365 68.0338 908.365 71.0003 906.365 73.6003C904.365 76.2003 901.435 78.2338 897.565 79.7003C893.765 81.1003 889.235 81.8003 883.965 81.8003ZM924.89 81.8003C922.16 81.8003 919.86 80.8668 917.99 79.0003C916.125 77.1338 915.19 74.8003 915.19 72.0003C915.19 69.1338 916.125 66.8338 917.99 65.1003C919.86 63.3003 922.16 62.4003 924.89 62.4003C927.625 62.4003 929.925 63.3003 931.79 65.1003C933.66 66.8338 934.59 69.1338 934.59 72.0003C934.59 74.8003 933.66 77.1338 931.79 79.0003C929.925 80.8668 927.625 81.8003 924.89 81.8003ZM945.165 27.2003H960.765V81.0003H945.165V27.2003ZM952.965 19.7003C950.095 19.7003 947.765 18.8669 945.965 17.2003C944.165 15.5336 943.265 13.4669 943.265 11.0003C943.265 8.53365 944.165 6.46695 945.965 4.8003C947.765 3.13363 950.095 2.30029 952.965 2.30029C955.83 2.30029 958.165 3.10029 959.965 4.7003C961.765 6.3003 962.665 8.3003 962.665 10.7003C962.665 13.3003 961.765 15.4669 959.965 17.2003C958.165 18.8669 955.83 19.7003 952.965 19.7003ZM1000.84 81.8003C995.175 81.8003 990.075 80.6338 985.54 78.3003C981.075 75.9003 977.575 72.6003 975.04 68.4003C972.51 64.2003 971.24 59.4338 971.24 54.1003C971.24 48.7669 972.51 44.0003 975.04 39.8003C977.575 35.6003 981.075 32.3336 985.54 30.0003C990.075 27.6003 995.175 26.4003 1000.84 26.4003C1006.51 26.4003 1011.57 27.6003 1016.04 30.0003C1020.51 32.3336 1024.01 35.6003 1026.54 39.8003C1029.07 44.0003 1030.34 48.7669 1030.34 54.1003C1030.34 59.4338 1029.07 64.2003 1026.54 68.4003C1024.01 72.6003 1020.51 75.9003 1016.04 78.3003C1011.57 80.6338 1006.51 81.8003 1000.84 81.8003ZM1000.84 69.0003C1004.84 69.0003 1008.11 67.6668 1010.64 65.0003C1013.24 62.2668 1014.54 58.6338 1014.54 54.1003C1014.54 49.5669 1013.24 45.9669 1010.64 43.3003C1008.11 40.5669 1004.84 39.2003 1000.84 39.2003C996.84 39.2003 993.54 40.5669 990.94 43.3003C988.34 45.9669 987.04 49.5669 987.04 54.1003C987.04 58.6338 988.34 62.2668 990.94 65.0003C993.54 67.6668 996.84 69.0003 1000.84 69.0003Z"
                  fill="white"
                />
                <path
                  d="M111.9 10.5003L89 80.5003H71.6L56.2 33.1003L40.3 80.5003H23L0 10.5003H16.8L32.6 59.7003L49.1 10.5003H64.1L80.1 60.1003L96.4 10.5003H111.9ZM154.008 25.9003C160.675 25.9003 166.042 27.9003 170.109 31.9003C174.242 35.9003 176.309 41.8336 176.309 49.7003V80.5003H160.708V52.1003C160.708 47.8336 159.776 44.6669 157.909 42.6003C156.042 40.4669 153.342 39.4003 149.809 39.4003C145.876 39.4003 142.742 40.6336 140.409 43.1003C138.076 45.5003 136.909 49.1003 136.909 53.9003V80.5003H121.309V6.30029H136.909V32.3003C138.976 30.2336 141.476 28.6669 144.409 27.6003C147.342 26.4669 150.542 25.9003 154.008 25.9003ZM212.149 25.9003C220.483 25.9003 226.882 27.9003 231.349 31.9003C235.816 35.8336 238.049 41.8003 238.049 49.8003V80.5003H223.449V73.8003C220.516 78.8003 215.049 81.3003 207.049 81.3003C202.916 81.3003 199.316 80.6003 196.249 79.2003C193.249 77.8003 190.949 75.8668 189.349 73.4003C187.749 70.9338 186.949 68.1338 186.949 65.0003C186.949 60.0003 188.816 56.0668 192.549 53.2003C196.349 50.3338 202.182 48.9003 210.049 48.9003H222.449C222.449 45.5003 221.416 42.9003 219.349 41.1003C217.282 39.2336 214.182 38.3003 210.049 38.3003C207.182 38.3003 204.349 38.7669 201.549 39.7003C198.816 40.5669 196.482 41.7669 194.549 43.3003L188.949 32.4003C191.883 30.3336 195.383 28.7336 199.449 27.6003C203.583 26.4669 207.816 25.9003 212.149 25.9003ZM210.949 70.8003C213.616 70.8003 215.982 70.2003 218.049 69.0003C220.116 67.7338 221.583 65.9003 222.449 63.5003V58.0003H211.749C205.349 58.0003 202.149 60.1003 202.149 64.3003C202.149 66.3003 202.916 67.9003 204.449 69.1003C206.049 70.2338 208.216 70.8003 210.949 70.8003ZM286.868 77.9003C285.334 79.0338 283.434 79.9003 281.168 80.5003C278.968 81.0338 276.634 81.3003 274.168 81.3003C267.768 81.3003 262.801 79.6668 259.268 76.4003C255.801 73.1338 254.068 68.3338 254.068 62.0003V39.9003H245.768V27.9003H254.068V14.8003H269.668V27.9003H283.068V39.9003H269.668V61.8003C269.668 64.0668 270.234 65.8338 271.368 67.1003C272.568 68.3003 274.234 68.9003 276.368 68.9003C278.834 68.9003 280.934 68.2338 282.668 66.9003L286.868 77.9003ZM325.046 10.5003H341.245V80.5003H325.046V10.5003ZM374.858 81.3003C370.391 81.3003 366.024 80.7668 361.758 79.7003C357.491 78.5668 354.091 77.1668 351.558 75.5003L356.758 64.3003C359.158 65.8338 362.058 67.1003 365.458 68.1003C368.858 69.0338 372.191 69.5003 375.458 69.5003C382.058 69.5003 385.358 67.8668 385.358 64.6003C385.358 63.0668 384.458 61.9668 382.658 61.3003C380.858 60.6338 378.091 60.0668 374.358 59.6003C369.958 58.9338 366.324 58.1668 363.458 57.3003C360.591 56.4338 358.091 54.9003 355.958 52.7003C353.891 50.5003 352.858 47.3669 352.858 43.3003C352.858 39.9003 353.824 36.9003 355.758 34.3003C357.758 31.6336 360.625 29.5669 364.358 28.1003C368.158 26.6336 372.624 25.9003 377.758 25.9003C381.558 25.9003 385.324 26.3336 389.058 27.2003C392.858 28.0003 395.991 29.1336 398.458 30.6003L393.258 41.7003C388.524 39.0336 383.358 37.7003 377.758 37.7003C374.424 37.7003 371.924 38.1669 370.258 39.1003C368.591 40.0336 367.758 41.2336 367.758 42.7003C367.758 44.3669 368.658 45.5336 370.458 46.2003C372.258 46.8669 375.124 47.5003 379.058 48.1003C383.458 48.8336 387.058 49.6336 389.858 50.5003C392.658 51.3003 395.091 52.8003 397.158 55.0003C399.224 57.2003 400.258 60.2668 400.258 64.2003C400.258 67.5338 399.258 70.5003 397.258 73.1003C395.258 75.7003 392.324 77.7338 388.458 79.2003C384.658 80.6003 380.125 81.3003 374.858 81.3003Z"
                  fill="white"
                />
              </svg>
            </footer>
          ) : (
            ''
          )}
        </div>
      </div>
      {loginModalOpen ? (
        <LoginWrapper
          onClose={() => {
            setLoginModalOpen(false);
          }}
          onLogin={() => {
            setLoginModalOpen(false);
          }}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default Layout;
