// Variáveis para contagem
let favoriteCount = 0;
let cartCount = 0;
let favoriteItems = new Set();
let cartItems = new Set();

// Dados dos itens (para exibir no modal de favoritos e carrinho)
const menuItemsData = {
  1: {
    name: "Fera da Selva",
    image:
      "https://img.freepik.com/fotos-premium/pizza-quente-feita-de-cogumelos-selvagens-e-flor-de-abobrinha_681987-125.jpg",
    description:
      "Molho de tomate picante, mussarela, pepperoni selvagem, pimenta jalapeño e cebola roxa.",
    price: 49.9,
  },
  2: {
    name: "Verde Selvagem",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description:
      "Molho pesto caseiro, mussarela de búfala, rúcula selvagem, tomate seco e azeitonas pretas.",
    price: 44.9,
  },
  3: {
    name: "Três Predadores",
    image:
      "https://i.pinimg.com/736x/5a/a6/45/5aa6456882812322f91af8a8655f74e6.jpg",
    description:
      "Mussarela, provolone, gorgonzola selvagem e parmesão envelhecido com orégano.",
    price: 47.9,
  },
  4: {
    name: "Caçador Selvagem",
    image:
      "https://img.freepik.com/fotos-premium/pizza-rustica-tradicional-com-calabresa-azeitonas-pretas-cebola-e-manjericao-pizza-isolada_425154-1507.jpg",
    description:
      "Molho de tomate caseiro, mussarela, calabresa defumada, cebola caramelizada e pimentão.",
    price: 42.9,
  },
  5: {
    name: "Frango Raivoso",
    image:
      "https://swiftbr.vteximg.com.br/arquivos/ids/203714-768-768/618062-pizza-de-frango-com-catupiry-seara_1.jpg.jpg?v=638708260014000000",
    description:
      "Frango desfiado temperado, catupiry cremoso, milho crocante e bacon crocante.",
    price: 46.9,
  },
  6: {
    name: "Selvagem Especial",
    image:
      "https://i.pinimg.com/736x/95/9a/05/959a05a23d3a3feea7d0477448539a15.jpg",
    description:
      "Deliciosa pizza de chocolate com morangos frescos, amoras silvestres e paçoca crocante, com borda recheada de chocolate belga.",
    price: 45.9,
  },
};

// Splash screen functionality
document.addEventListener("DOMContentLoaded", function () {
  const splashScreen = document.getElementById("splash-screen");
  const enterBtn = document.getElementById("enter-btn");
  const mainSite = document.getElementById("main-site");

  // Função para iniciar a transição
  function startTransition() {
    splashScreen.style.opacity = "0";
    setTimeout(() => {
      splashScreen.style.display = "none";
      mainSite.style.display = "block";
      mainSite.style.opacity = "0";
      setTimeout(() => {
        mainSite.style.opacity = "1";
        mainSite.style.transition = "opacity 0.8s ease";
      }, 50);
    }, 500);
  }

  // Event listeners para o splash screen
  enterBtn.addEventListener("click", startTransition);

  // Smooth scrolling para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Formulário de pedido
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Pedido enviado com sucesso! Em breve entraremos em contato para confirmar."
      );
      orderForm.reset();
    });
  }

  // Sistema de avaliação por estrelas
  const ratings = document.querySelectorAll(".rating");
  ratings.forEach((rating) => {
    const stars = rating.querySelectorAll(".star");
    let currentRating = 0;
    stars.forEach((star) => {
      star.addEventListener("click", function (e) {
        e.stopPropagation(); // Impede que o clique se propague para o menu-item
        const value = parseInt(this.getAttribute("data-value"));
        if (currentRating === value) {
          stars.forEach((s) => {
            s.classList.remove("active");
            s.style.color = "#ddd";
          });
          currentRating = 0;
          rating.setAttribute("data-rating", "0");
        } else {
          currentRating = value;
          rating.setAttribute("data-rating", value);
          stars.forEach((s, index) => {
            if (index < value) {
              s.classList.add("active");
              s.style.color = "#FFD700";
            } else {
              s.classList.remove("active");
              s.style.color = "#ddd";
            }
          });
        }
      });

      star.addEventListener("mouseover", function () {
        const value = parseInt(this.getAttribute("data-value"));
        stars.forEach((s, index) => {
          if (index < value) {
            s.style.color = "#FFD700";
          }
        });
      });

      star.addEventListener("mouseout", function () {
        stars.forEach((s) => {
          if (s.classList.contains("active")) {
            s.style.color = "#FFD700";
          } else {
            s.style.color = "#ddd";
          }
        });
      });
    });
  });

  // Sistema de favoritos
  const favoriteIcons = document.querySelectorAll(".favorite-icon");
  const headerFavoriteIcon = document.getElementById("favorite-icon");
  const favoriteCountElement = document.getElementById("favorite-count");

  favoriteIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation(); // Impede que o clique se propague para o menu-item
      const itemId = this.getAttribute("data-item");
      if (favoriteItems.has(itemId)) {
        favoriteItems.delete(itemId);
        this.classList.remove("active");
        favoriteCount--;
      } else {
        favoriteItems.add(itemId);
        this.classList.add("active");
        favoriteCount++;
      }
      favoriteCountElement.textContent = favoriteCount;
      if (favoriteCount > 0) {
        headerFavoriteIcon.classList.add("active");
      } else {
        headerFavoriteIcon.classList.remove("active");
      }
    });
  });

  // Sistema de carrinho
  const cartIcons = document.querySelectorAll(".cart-icon");
  const headerCartIcon = document.getElementById("cart-icon");
  const cartCountElement = document.getElementById("cart-count");

  cartIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation(); // Impede que o clique se propague para o menu-item
      const itemId = this.getAttribute("data-item");
      if (cartItems.has(itemId)) {
        cartItems.delete(itemId);
        this.classList.remove("active");
        cartCount--;
      } else {
        cartItems.add(itemId);
        this.classList.add("active");
        cartCount++;
      }
      cartCountElement.textContent = cartCount;
      if (cartCount > 0) {
        headerCartIcon.classList.add("active");
      } else {
        headerCartIcon.classList.remove("active");
      }
    });
  });

  // Ícone de favorito no header - abre modal de favoritos
  headerFavoriteIcon.addEventListener("click", function () {
    showFavoritesModal();
  });

  // Ícone de carrinho no header - abre modal de carrinho
  headerCartIcon.addEventListener("click", function () {
    showCartModal();
  });

  // Modal functionality - apenas nas imagens
  const menuImages = document.querySelectorAll(".menu-img");
  const modals = document.querySelectorAll(
    ".modal:not(.favorites-modal):not(.cart-modal)"
  );
  const closeButtons = document.querySelectorAll(".close");

  menuImages.forEach((image) => {
    image.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(`modal-${modalId}`);
      if (modal) {
        modal.style.display = "block";
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      modal.style.display = "none";
    });
  });

  window.addEventListener("click", function (event) {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
    // Fechar modais de favoritos e carrinho também
    const favoritesModal = document.getElementById("favorites-modal");
    const cartModal = document.getElementById("cart-modal");
    if (event.target === favoritesModal) {
      favoritesModal.style.display = "none";
    }
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  // Modal icons functionality
  const modalFavorites = document.querySelectorAll(".modal-favorite");
  const modalCarts = document.querySelectorAll(".modal-cart");

  modalFavorites.forEach((icon) => {
    icon.addEventListener("click", function () {
      const itemId = this.getAttribute("data-item");
      const mainIcon = document.querySelector(
        `.favorite-icon[data-item="${itemId}"]`
      );
      if (favoriteItems.has(itemId)) {
        favoriteItems.delete(itemId);
        this.classList.remove("active");
        mainIcon.classList.remove("active");
        favoriteCount--;
      } else {
        favoriteItems.add(itemId);
        this.classList.add("active");
        mainIcon.classList.add("active");
        favoriteCount++;
      }
      favoriteCountElement.textContent = favoriteCount;
      if (favoriteCount > 0) {
        headerFavoriteIcon.classList.add("active");
      } else {
        headerFavoriteIcon.classList.remove("active");
      }
    });
  });

  modalCarts.forEach((icon) => {
    icon.addEventListener("click", function () {
      const itemId = this.getAttribute("data-item");
      const mainIcon = document.querySelector(
        `.cart-icon[data-item="${itemId}"]`
      );
      if (cartItems.has(itemId)) {
        cartItems.delete(itemId);
        this.classList.remove("active");
        mainIcon.classList.remove("active");
        cartCount--;
      } else {
        cartItems.add(itemId);
        this.classList.add("active");
        mainIcon.classList.add("active");
        cartCount++;
      }
      cartCountElement.textContent = cartCount;
      if (cartCount > 0) {
        headerCartIcon.classList.add("active");
      } else {
        headerCartIcon.classList.remove("active");
      }
    });
  });

  // Função para mostrar o modal de favoritos
  function showFavoritesModal() {
    const favoritesModal = document.getElementById("favorites-modal");
    const favoritesList = document.getElementById("favorites-list");

    // Limpar lista atual
    favoritesList.innerHTML = "";

    // Verificar se há favoritos
    if (favoriteItems.size === 0) {
      favoritesList.innerHTML = `
                <div class="no-favorites">
                    <i class="fas fa-heart"></i>
                    <h3>Nenhum favorito ainda</h3>
                    <p>Adicione itens aos seus favoritos para vê-los aqui.</p>
                </div>
            `;
    } else {
      // Adicionar cada item favorito
      favoriteItems.forEach((itemId) => {
        const item = menuItemsData[itemId];
        if (item) {
          const favoriteItem = document.createElement("div");
          favoriteItem.className = "favorite-item";
          favoriteItem.innerHTML = `
                        <div class="favorite-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="favorite-item-info">
                            <h4>${item.name}</h4>
                            <p>${item.description}</p>
                        </div>
                        <div class="favorite-item-remove" data-item="${itemId}">
                            <i class="fas fa-times"></i>
                        </div>
                    `;
          favoritesList.appendChild(favoriteItem);
        }
      });

      // Adicionar evento de remoção para cada item
      document
        .querySelectorAll(".favorite-item-remove")
        .forEach((removeBtn) => {
          removeBtn.addEventListener("click", function () {
            const itemId = this.getAttribute("data-item");
            removeFavorite(itemId);
          });
        });
    }

    // Mostrar modal
    favoritesModal.style.display = "block";
  }

  // Função para mostrar o modal de carrinho
  function showCartModal() {
    const cartModal = document.getElementById("cart-modal");
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    // Limpar lista atual
    cartList.innerHTML = "";

    // Verificar se há itens no carrinho
    if (cartItems.size === 0) {
      cartList.innerHTML = `
                <div class="no-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Carrinho vazio</h3>
                    <p>Adicione itens ao seu carrinho para vê-los aqui.</p>
                </div>
            `;
      cartTotal.innerHTML = "Total: <span>R$ 0,00</span>";
    } else {
      let total = 0;
      // Adicionar cada item do carrinho
      cartItems.forEach((itemId) => {
        const item = menuItemsData[itemId];
        if (item) {
          total += item.price;
          const cartItem = document.createElement("div");
          cartItem.className = "cart-item";
          cartItem.innerHTML = `
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>${item.description}</p>
                            <div class="cart-item-price">R$ ${item.price.toFixed(
                              2
                            )}</div>
                        </div>
                        <div class="cart-item-remove" data-item="${itemId}">
                            <i class="fas fa-times"></i>
                        </div>
                    `;
          cartList.appendChild(cartItem);
        }
      });

      // Atualizar total
      cartTotal.innerHTML = `Total: <span>R$ ${total.toFixed(2)}</span>`;

      // Adicionar evento de remoção para cada item
      document.querySelectorAll(".cart-item-remove").forEach((removeBtn) => {
        removeBtn.addEventListener("click", function () {
          const itemId = this.getAttribute("data-item");
          removeCartItem(itemId);
        });
      });
    }

    // Mostrar modal
    cartModal.style.display = "block";
  }

  // Função para remover um item dos favoritos
  function removeFavorite(itemId) {
    // Remover do conjunto
    favoriteItems.delete(itemId);
    favoriteCount--;

    // Atualizar contagem
    favoriteCountElement.textContent = favoriteCount;

    // Remover classe active do ícone principal
    const mainIcon = document.querySelector(
      `.favorite-icon[data-item="${itemId}"]`
    );
    if (mainIcon) {
      mainIcon.classList.remove("active");
    }

    // Verificar se ainda há favoritos
    if (favoriteCount === 0) {
      headerFavoriteIcon.classList.remove("active");
    }

    // Atualizar modal
    showFavoritesModal();
  }

  // Função para remover um item do carrinho
  function removeCartItem(itemId) {
    // Remover do conjunto
    cartItems.delete(itemId);
    cartCount--;

    // Atualizar contagem
    cartCountElement.textContent = cartCount;

    // Remover classe active do ícone principal
    const mainIcon = document.querySelector(
      `.cart-icon[data-item="${itemId}"]`
    );
    if (mainIcon) {
      mainIcon.classList.remove("active");
    }

    // Verificar se ainda há itens no carrinho
    if (cartCount === 0) {
      headerCartIcon.classList.remove("active");
    }

    // Atualizar modal
    showCartModal();
  }
});
